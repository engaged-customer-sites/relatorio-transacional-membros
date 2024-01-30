# Importações necessárias
import pymongo
from bson import ObjectId
import requests
import json
import pandas as pd

# Configurações de conexão e URL
GRAPHQL_URL = 'https://api.online.engaged.com.br/graphql'
MONGO_URI = "mongodb+srv://[username]:[password]@aws-engaged-core.6wjwx.mongodb.net/admin" 
DATABASE_NAME = "prod-member-area-api-db"

# Definindo os parâmetros de consulta
START_DATE = "2000-01-01T03:00:00.000Z"
END_DATE = "2025-01-25T02:59:59.999Z"
ORGANIZATION_ID = "610c46bd8362420008e7ed86"
RECIPIENT_ID = "62d590a204a14600091aab1e"

#ENUMS 
HEADERS = {
    'authority': 'api.online.engaged.com.br',
    'accept': '*/*',
    'accept-language': 'en,en-US;q=0.9,pt-BR;q=0.8,pt;q=0.7',
    'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2NWIxMTFmYTZmZGY4NjAwMDlhZmJlNzYiLCJpYXQiOjE3MDYxMDMyOTAsImV4cCI6MTc5MjUwMzI5MH0.rVOeT9vMcbUoQ58hviwS2IrQC_byT18nwa6USe9LaYM',
    'content-type': 'application/json',
    'origin': 'https://admin.online.engaged.com.br',
    'referer': 'https://admin.online.engaged.com.br/',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

OPERATION_DESCRIPTION = {
    "CREDIT_CARD_ANTICIPATED_PAYABLE_PAYMENT": 'Antecipação de pagamento da parcela {0} realizado via cartão de crédito.',
    "CREDIT_CARD_PAYABLE_CHARGEBACK_REFUND": 'Reembolso de chargeback de pagamento da parcela {0} realizado via cartão de crédito.',
    "CREDIT_CARD_PAYABLE_CHARGEBACK": 'Chargeback de pagamento da parcela {0} realizado via cartão de crédito.',
    "CREDIT_CARD_PAYABLE_PAYMENT": 'Pagamento da parcela {0} realizado via cartão de crédito.',
    "CREDIT_CARD_PAYABLE_REFUND": 'Reembolso de pagamento da parcela {0} realizado via cartão de crédito.',
    "BANK_SLIP_REFUND_REVERSAL": 'Reversão de reembolso de pagamento realizado via boleto bancário.',
    "BANK_SLIP_REFUND_FEE": 'Reembolso de taxa de pagamento realizado via boleto bancário.',
    "BANK_SLIP_PAYMENT": 'Pagamento realizado via boleto bancário.',
    "UNKNOWN_OPERATION": 'Operação desconhecida.',
    "BANK_SLIP_REFUND": 'Reembolso de pagamento realizado via boleto bancário.',
    "TRANSFER_PAYMENT": 'Pagamento realizado via transferência.',
    "TRANSFER_REFUND": 'Reembolso de pagamento realizado via transferência.',
    "PIX_PAYMENT": 'Pagamento realizado via PIX.',
    "PIX_REFUND": 'Reembolso pagamento realizado via PIX.'
}

OPERATION_SHORT = {
    "CREDIT_CARD_ANTICIPATED_PAYABLE_PAYMENT": 'Antecipação',
    "CREDIT_CARD_PAYABLE_CHARGEBACK_REFUND": 'Reembolso',
    "CREDIT_CARD_PAYABLE_CHARGEBACK": 'Chargeback',
    "CREDIT_CARD_PAYABLE_PAYMENT": 'Crédito',
    "CREDIT_CARD_PAYABLE_REFUND": 'Crédito',
    "BANK_SLIP_REFUND_REVERSAL": 'Reversão de reembolso',
    "BANK_SLIP_REFUND_FEE": 'Reembolso',
    "BANK_SLIP_PAYMENT": 'Boleto',
    "UNKNOWN_OPERATION": 'Desconhecido',
    "BANK_SLIP_REFUND": 'Reembolso',
    "TRANSFER_PAYMENT": 'Transferência',
    "TRANSFER_REFUND": 'Reembolso',
    "PIX_PAYMENT": 'PIX',
    "PIX_REFUND": 'Reembolso'
  }

TAX_ID_TYPE = {
    "AE_TRN": 'AE_TRN',
    "AU_ABN": 'AU_ABN',
    "BR_CNPJ": 'CNPJ',
    "BR_CPF": 'CPF',
    "CA_BN": 'CA_BN',
    "CA_GST_HST": 'CA_GST_HST',
    "CA_PST_BC": 'CA_PST_BC',
    "CA_PST_MB": 'CA_PST_MB',
    "CA_PST_SK": 'CA_PST_SK',
    "CA_QST": 'CA_QST',
    "CH_VAT": 'CH_VAT',
    "CL_TIN": 'CL_TIN',
    "ES_CIF": 'ES_CIF',
    "EU_VAT": 'EU_VAT',
    "GB_VAT": 'GB_VAT',
    "HK_BR": 'HK_BR',
    "ID_NPWP": 'ID_NPWP',
    "IL_VAT": 'IL_VAT',
    "IN_GST": 'IN_GST',
    "JP_CN": 'JP_CN',
    "JP_RN": 'JP_RN',
    "KR_BRN": 'KR_BRN',
    "LI_UID": 'LI_UID',
    "MX_RFC": 'MX_RFC',
    "MY_FRP": 'MY_FRP',
    "MY_ITN": 'MY_ITN',
    "MY_SST": 'MY_SST',
    "NO_VAT": 'NO_VAT',
    "NZ_GST": 'NZ_GST',
    "RU_INN": 'RU_INN',
    "RU_KPP": 'RU_KPP',
    "SA_VAT": 'SA_VAT',
    "SG_GST": 'SG_GST',
    "SG_UEN": 'SG_UEN',
    "TH_VAT": 'TH_VAT',
    "TW_VAT": 'TW_VAT',
    "US_EIN": 'US_EIN',
    "ZA_VAT": 'ZA_VAT'
  }

OPERATION_ENTRANCE_EXIT = {
    "CREDIT_CARD_ANTICIPATED_PAYABLE_PAYMENT": 'Entrace',
    "CREDIT_CARD_PAYABLE_CHARGEBACK_REFUND": 'Entrace',
    "CREDIT_CARD_PAYABLE_CHARGEBACK": 'Exit',
    "CREDIT_CARD_PAYABLE_PAYMENT": 'Entrace',
    "CREDIT_CARD_PAYABLE_REFUND": 'Exit',
    "BANK_SLIP_REFUND_REVERSAL": 'Entrace',
    "BANK_SLIP_REFUND_FEE": 'Exit',
    "BANK_SLIP_PAYMENT": 'Entrace',
    "UNKNOWN_OPERATION": 'Entrace',
    "BANK_SLIP_REFUND": 'Exit',
    "TRANSFER_PAYMENT": 'Exit',
    "TRANSFER_REFUND": 'Entrace',
    "PIX_PAYMENT": 'Entrace',
    "PIX_REFUND": 'Exit'
}

RENAME_MAPPING = {
    "type" : "Tipo",
    "balanceOperation.amount": "Total",
    "balanceOperation.createdAt": "Data de Criação",
    "payment._id": "ID do Pagamento",
    "payment.Nome": "Dados do Usuário | Nome",
    "payment.E-Mail": "Dados do Usuário | E-Mail",
    "payment.Telefone": "Dados do Usuário | Telefone",
    "payment.Valor do Pagamento": "Valor do Pagamento",
    "payment.Nome do Pagador": "Dados do Pagador | Nome",
    "payment.Tipo de Documento do Pagador": "Dados do Pagador | Tipo de Documento do Pagador",
    "payment.Número do Documento do Pagador": "Dados do Pagador | Número do Documento do Pagador",
    "payment.CEP": "Endereço | CEP",
    "payment.País": "Endereço | País",
    "payment.Cidade": "Endereço | Cidade",
    "payment.UF": "Endereço | Unidade Federativa",
    "payment.Bairro": "Endereço | Bairro",
    "payment.Rua": "Endereço | Rua",
    "payment.Número": "Endereço | Número",
    "payment.Complemento": "Endereço | Complemento",
    "Descrição" : "Descrição"
}

COLUMN_ORDER = [
    "payment._id",
    "balanceOperation.createdAt",
    "payment.Nome",
    "payment.E-Mail",
    "payment.Telefone",
    "type",
    "Descrição",
    "payment.Valor do Pagamento",
    "balanceOperation.amount",
    "payment.Nome do Pagador",
    "payment.Tipo de Documento do Pagador",
    "payment.Número do Documento do Pagador",
    "payment.CEP",
    "payment.País",
    "payment.Cidade",
    "payment.UF",
    "payment.Bairro",
    "payment.Rua",
    "payment.Número",
    "payment.Complemento",
    "balanceOperation.id",
    "payable.installment"
]

def fetch_operations(page):
    """
    Realiza uma requisição GraphQL para obter as operações de balanço do destinatário.

    Args:
        page (int): Número da página a ser consultada.

    Returns:
        dict: Resposta JSON da requisição.
    """
    query_data  = {
        "query": "query recipientBalanceOperations($pagination: PagePaginationInput!, $endDate: DateTime, $startDate: DateTime, $recipientId: String!, $organizationId: String!) {\n  adminFetchRecipientBalanceOperations(\n    paginationArgs: $pagination\n    endDate: $endDate\n    startDate: $startDate\n    recipientId: $recipientId\n    organizationId: $organizationId\n  ) {\n    results {\n      type\n      balanceOperation {\n        id\n        amount\n        feeAmount\n        createdAt\n      }\n      ... on PixPaymentOperation {\n        payment {\n          _id\n        }\n      }\n      ... on PixRefundOperation {\n        payment {\n          _id\n        }\n      }\n      ... on BankSlipPaymentOperation {\n        payment {\n          _id\n        }\n      }\n      ... on BankSlipRefundOperation {\n        payment {\n          _id\n        }\n      }\n      ... on BankSlipRefundFeeOperation {\n        payment {\n          _id\n        }\n      }\n      ... on BankSlipRefundReversalOperation {\n        payment {\n          _id\n        }\n      }\n      ... on CreditCardAnticipatedPayablePaymentOperation {\n        payment {\n          _id\n        }\n        payable {\n          installment\n        }\n      }\n      ... on CreditCardPayablePaymentOperation {\n        payment {\n          _id\n        }\n        payable {\n          installment\n        }\n      }\n      ... on CreditCardPayableRefundOperation {\n        payment {\n          _id\n        }\n        payable {\n          installment\n        }\n      }\n      ... on CreditCardPayableChargebackOperation {\n        payment {\n          _id\n        }\n        payable {\n          installment\n        }\n      }\n      ... on CreditCardPayableChargebackRefundOperation {\n        payment {\n          _id\n        }\n        payable {\n          installment\n        }\n      }\n    }\n    currentPage\n    hasNextPage\n  }\n}\n",
        "variables": {
            "startDate": START_DATE,
            "endDate": END_DATE,
            "organizationId": ORGANIZATION_ID,
            "pagination": {
                "limit": 20,
                "page": page
            },
            "recipientId": RECIPIENT_ID
        }
    }
    response = requests.post(GRAPHQL_URL, headers=HEADERS, data=json.dumps(query_data))
    return response.json()

def fetch_payment_info(payment_id):
    """
    Busca informações de pagamento no MongoDB usando o ID do pagamento.

    Args:
        payment_id (str): ID do pagamento.

    Returns:
        dict: Documento contendo informações do pagamento.
    """
    pipeline = [
        {
            "$match": {
            "_id": ObjectId(str(payment_id)),
            },
        },
        {
            "$lookup": {
            "from": "userpaymentprofiles",
            "localField": "userPaymentProfile",
            "foreignField": "_id",
            "as": "userPaymentProfile",
            },
        },
        {
            "$lookup": {
            "from": "users",
            "localField": "user",
            "foreignField": "_id",
            "as": "user",
            },
        },
        {
            "$addFields": {
            "userPaymentProfile": {
                "$arrayElemAt": ["$userPaymentProfile", 0],
            },
            "user": {
                "$arrayElemAt": ["$user", 0],
            },
            },
        },
        {
            "$addFields": {
            "userPaymentProfile.taxIds": {
                "$arrayElemAt": [
                "$userPaymentProfile.taxIds",
                0,
                ],
            },
            },
        },
        {
            "$project": {
            "_id": 0,
            "Nome": "$user.name",
            "E-Mail": "$user.email",
            "Telefone": "$user.phoneNumber",
            "Valor do Pagamento": "$amount",
            "Nome do Pagador":
                "$userPaymentProfile.name",
            "Tipo de Documento do Pagador":
                "$userPaymentProfile.taxIds.type",
            "Número do Documento do Pagador":
                "$userPaymentProfile.taxIds.value",
            "CEP": "$userPaymentProfile.address.zipcode",
            "País": "$userPaymentProfile.address.country",
            "Cidade": "$userPaymentProfile.address.city",
            "UF": "$userPaymentProfile.address.state",
            "Bairro":
                "$userPaymentProfile.address.neighborhood",
            "Rua": "$userPaymentProfile.address.street",
            "Número":
                "$userPaymentProfile.address.number",
            "Complemento":
                "$userPaymentProfile.address.complement",
            },
        },
        {"$limit": 1}
    ]
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    documents = list(db.payments.aggregate(pipeline))
    document = documents[0]
    return document

def get_operation_description(row):
    type = row.get('type', 'UNKNOWN_OPERATION')
    description = OPERATION_DESCRIPTION.get(type, 'Operação desconhecida.')
    if '{0}' in description:
        installment = row.get('payable.installment', 'N/A')
        try:
            installment = int(installment)
        except:
            installment = "?"
        description = description.format(installment)
    return description

def get_operation_type(row):
    type = row.get('type', 'UNKNOWN_OPERATION')
    new_type = OPERATION_SHORT.get(type, 'Operação desconhecida.')
    return new_type

def get_tax_id_type(row):
    taxIdType = row.get("payment.Tipo de Documento do Pagador", 'UNKNOWN')
    new_taxIdType = TAX_ID_TYPE.get(taxIdType, '')
    return new_taxIdType

RECIPIENT_IDS = []

for RECIPIENT_ID in RECIPIENT_IDS:
    # Coleta de dados
    all_results = []
    current_page = 0
    has_next_page = True

    while has_next_page:
        current_page += 1
        response = fetch_operations(current_page)
        results = response['data']['adminFetchRecipientBalanceOperations']['results']
        has_next_page = response['data']['adminFetchRecipientBalanceOperations']['hasNextPage']
        all_results.extend(results)

    # Processamento dos resultados
    for result in all_results:
        if 'payment' in result and '_id' in result['payment']:
            payment_info = fetch_payment_info(result['payment']['_id'])
            if payment_info:
                result['payment'].update(payment_info)
                
    processed_data = []

    for item in all_results:
        new_item = item.copy()

        if 'balanceOperation' in new_item:
            new_item['balanceOperation']['amount'] = (new_item['balanceOperation']['amount'] / 100 ) - ( new_item['balanceOperation']['feeAmount'] / 100 )
            new_item['balanceOperation'].pop('feeAmount')
            
        if 'payment' in new_item and 'Valor do Pagamento' in new_item['payment']:
            if OPERATION_ENTRANCE_EXIT[new_item['type']] == 'Entrace':
                new_item['payment']['Valor do Pagamento'] = new_item['payment']['Valor do Pagamento'] / 100

        processed_data.append(new_item)

    df = pd.json_normalize(processed_data)

    df['Descrição'] = df.apply(get_operation_description, axis=1)
    df['type'] = df.apply(get_operation_type, axis=1)
    df["payment.Tipo de Documento do Pagador"] = df.apply(get_tax_id_type, axis=1)

    df = df[COLUMN_ORDER]

    df = df.rename(columns=RENAME_MAPPING)

    if "balanceOperation.id" in df: 
        df = df.drop("balanceOperation.id", axis=1)
        
    if "payable.installment" in df: 
        df = df.drop("payable.installment", axis=1)

# Salvando em um arquivo Excel
df.to_excel("pagamentos.xlsx", index=False)
