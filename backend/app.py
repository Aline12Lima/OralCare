from flask_cors import CORS
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from supabase import create_client, Client

load_dotenv()

app = Flask(__name__)

# ✅ CORS CORRETO
CORS(app)

# --- Supabase ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError("SUPABASE_URL e SUPABASE_SERVICE_KEY são obrigatórios no .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# --- SMTP (Gmail) ---
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

if not EMAIL_USER or not EMAIL_PASS:
    raise RuntimeError("EMAIL_USER e EMAIL_PASS são obrigatórios no .env")


# ✅ ROTA COM OPTIONS SEPARADO
@app.route("/send", methods=["POST", "OPTIONS"])
def send_form():
    # 🔹 Resposta imediata ao preflight
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.get_json(silent=True) or {}

        nome = (data.get("nome") or "").strip()
        telefone = str(data.get("telefone") or "").strip()
        email = (data.get("email") or "").strip()
        servico = (data.get("servico") or "").strip()

        if not nome or not telefone or not email or not servico:
            return jsonify({"status": "erro", "mensagem": "Dados inválidos."}), 400

        # 1️⃣ Enviar e-mail
        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER
        msg["Subject"] = f"Novo pedido de orçamento - {nome}"

        body = (
            f"Nome: {nome}\n"
            f"Telefone: {telefone}\n"
            f"Email: {email}\n"
            f"Serviço: {servico}\n"
        )
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        # 2️⃣ Salvar no Supabase
        supabase.table("odontocare").insert(
            {
                "Nome": nome,
                "Telefone": telefone,
                "Email": email,
                "Servico": servico,
            }
        ).execute()

        return jsonify({"status": "sucesso", "mensagem": "Formulário enviado!"}), 200

    except Exception as e:
        print("Erro no backend:", repr(e))
        return (
            jsonify({"status": "erro", "mensagem": "Erro ao processar o formulário."}),
            500,
        )
