<template>
  <br />
  <br />
  <q-page class="flex flex-center">
    <q-card style="margin-left: 50px; max-width: 90%">
      <div class="text-h6 q-pa-md" style="text-align: center">
        Relatório Transacional da Área de Membros
      </div>
      <div class="q-pa-md" style="min-width: 1000px">
        <div class="row">
          <div class="col q-pa-md">
            <q-select
              outlined
              v-model="selectedOrganizations"
              multiple
              :options="organizationsOptions"
              use-chips
              stack-label
              label="Organizações"
              @update:model-value="fetchRecipientsOptions"
            />
          </div>
          <div class="col q-pa-md">
            <q-select
              outlined
              v-model="selectedRecipients"
              multiple
              :options="recipientsOptions"
              use-chips
              stack-label
              label="Recebedores"
            />
          </div>
          <div class="col q-pa-md">
            <q-input
              label="Data Inicial"
              outlined
              v-model="START_DATE"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="START_DATE">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col q-pa-md">
            <q-input
              label="Data Final"
              outlined
              v-model="END_DATE"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="END_DATE">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row justify-end">
          <div class="q-pa-md">
            <q-btn
              color="primary"
              icon-right="archive"
              label="Exportar"
              no-caps
              v-if="tableLoaded && !fetchAllDataBtnLoading"
              @click="exportToExcel"
            />
          </div>
          <div class="q-pa-md">
            <q-btn
              color="primary"
              label="Gerar Relatório"
              no-caps
              @click="fetchAllData"
              v-if="!fetchAllDataBtnLoading"
            />
          </div>
        </div>

        <br />
        <q-card class="q-pa-md" v-if="tableLoaded">
          <p align="center">
            <q-spinner
              color="primary"
              size="3em"
              v-if="fetchAllDataBtnLoading"
            />
          </p>
          <q-table
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="name"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            v-if="!fetchAllDataBtnLoading"
          />
        </q-card>
      </div>
    </q-card>
  </q-page>
  <br />
  <br />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/user";
import axios from "axios";
import { utils, writeFile } from "xlsx";

export default defineComponent({
  name: "MembersTransacional",
  setup() {
    const authStore = useAuthStore();
    const GRAPHQL_URL = "https://api.online.engaged.com.br/graphql";

    const START_DATE = ref("2023/01/01");

    const currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, "0");
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const yyyy = currentDate.getFullYear();

    const END_DATE = ref(`${yyyy}/${mm}/${dd}`);

    const fetchAllDataBtnLoading = ref(false);

    const tableLoaded = ref(false);

    const HEADERS = ref({ authorization: `${authStore.token}` });

    const rows = ref([]);
    const columns = ref([
      {
        name: "_id",
        required: true,
        label: "ID do Pagamento",
        align: "left",
        field: (row) => row._id,
        sortable: true,
      },
      {
        name: "createdAt",
        required: true,
        label: "Data de Criação da Operação",
        field: (row) => row.createdAt,
        align: "left",
      },
      {
        name: "user_name",
        required: true,
        label: "Dados do Usuário | Nome",
        field: (row) => row.user_name,
        align: "left",
      },
      {
        name: "user_email",
        required: true,
        label: "Dados do Usuário | E-Mail",
        field: (row) => row.user_email,
        align: "left",
      },
      {
        name: "user_phone",
        label: "Dados do Usuário | Telefone",
        field: (row) => row.user_phone,
        align: "left",
      },
      {
        name: "typeShort",
        required: true,
        label: "Tipo da Operação",
        field: (row) => row.typeShort,
        align: "left",
      },
      {
        name: "typeDescription",
        required: true,
        label: "Descrição da Operação",
        field: (row) => row.typeDescription,
        align: "left",
      },
      {
        name: "payment_value",
        required: true,
        label: "Valor Total do Pagamento",
        hint: "text",
        field: (row) => row.payment_value,
        format: (val) => `R$ ${(val * 1).toFixed(2)}`,
        sortable: true,
      },
      {
        name: "operation_value",
        required: true,
        label: "Valor da Operação",
        field: (row) => row.operation_value,
        format: (val) => `R$ ${(val * 1).toFixed(2)}`,
        sortable: true,
      },
      // {
      //   name: "operation_feeAmount",
      //   required: true,
      //   label: "Taxa da Operação",
      //   field: (row) => row.operation_feeAmount,
      //   format: (val) => `R$ ${(val * 1).toFixed(2)}`,
      //   sortable: true,
      // },
      {
        name: "payer_name",
        required: true,
        label: "Dados do Pagador | Nome",
        field: (row) => row.payer_name,
        align: "left",
      },
      {
        name: "payer_address_zipcode",
        required: true,
        label: "Endereço do Pagador | CEP",
        field: (row) => row.payer_address_zipcode,
        align: "left",
      },
      {
        name: "payer_address_country",
        required: true,
        label: "Endereço do Pagador | País",
        field: (row) => row.payer_address_country,
        align: "left",
      },
      {
        name: "payer_address_city",
        required: true,
        label: "Endereço do Pagador | Cidade",
        field: (row) => row.payer_address_city,
        align: "left",
      },
      {
        name: "payer_address_state",
        required: true,
        label: "Endereço do Pagador | Unidade Federativa",
        field: (row) => row.payer_address_state,
        align: "left",
      },
      {
        name: "payer_address_neighborhood",
        required: true,
        label: "Endereço do Pagador | Bairro",
        field: (row) => row.payer_address_neighborhood,
        align: "left",
      },
      {
        name: "payer_address_street",
        required: true,
        label: "Endereço do Pagador | Rua",
        field: (row) => row.payer_address_street,
        align: "left",
      },
      {
        name: "payer_address_number",
        required: true,
        label: "Endereço do Pagador | Número",
        field: (row) => row.payer_address_number,
        align: "left",
      },
      {
        name: "payer_address_complement",
        required: true,
        label: "Endereço do Pagador | Complemento",
        field: (row) => row.payer_address_complement,
        align: "left",
      },
      {
        name: "payer_tax_ids_type",
        required: true,
        label: "Dados do Pagador | Tipo de Documento",
        field: (row) => row.payer_tax_ids_type,
        align: "left",
      },
      {
        name: "payer_tax_ids_value",
        required: true,
        label: "Dados do Pagador | Número do Documento",
        field: (row) => row.payer_tax_ids_value,
        align: "left",
      },
      {
        name: "payable_amount",
        required: true,
        label: "Valor da Parcela",
        field: (row) => row.payable_amount,
        format: (val) => `R$ ${(val * 1).toFixed(2)}`,
        align: "left",
      },
      {
        name: "payable_feeAmount",
        required: true,
        label: "Taxa da Parcela",
        field: (row) => row.payable_feeAmount,
        format: (val) => `R$ ${(val * 1).toFixed(2)}`,
        align: "left",
      },
      {
        name: "payable_anticipationFeeAmount",
        required: true,
        label: "Taxa de Antecipação da Parcela",
        field: (row) => row.payable_anticipationFeeAmount,
        format: (val) => `R$ ${(val * 1).toFixed(2)}`,
        align: "left",
      },
      {
        name: "payable_installment",
        required: true,
        label: "Número da Parcela",
        field: (row) => row.payable_installment,
        align: "left",
      },
    ]);

    const OPERATION_DESCRIPTION = ref({
      CREDIT_CARD_ANTICIPATED_PAYABLE_PAYMENT:
        "Antecipação de pagamento da parcela {0} realizado via cartão de crédito.",
      CREDIT_CARD_PAYABLE_CHARGEBACK_REFUND:
        "Reembolso de chargeback de pagamento da parcela {0} realizado via cartão de crédito.",
      CREDIT_CARD_PAYABLE_CHARGEBACK:
        "Chargeback de pagamento da parcela {0} realizado via cartão de crédito.",
      CREDIT_CARD_PAYABLE_PAYMENT:
        "Pagamento da parcela {0} realizado via cartão de crédito.",
      CREDIT_CARD_PAYABLE_REFUND:
        "Reembolso de pagamento da parcela {0} realizado via cartão de crédito.",
      BANK_SLIP_REFUND_REVERSAL:
        "Reversão de reembolso de pagamento realizado via boleto bancário.",
      BANK_SLIP_REFUND_FEE:
        "Reembolso de taxa de pagamento realizado via boleto bancário.",
      BANK_SLIP_PAYMENT: "Pagamento realizado via boleto bancário.",
      UNKNOWN_OPERATION: "Operação desconhecida.",
      BANK_SLIP_REFUND: "Reembolso de pagamento realizado via boleto bancário.",
      TRANSFER_PAYMENT: "Pagamento realizado via transferência.",
      TRANSFER_REFUND: "Reembolso de pagamento realizado via transferência.",
      PIX_PAYMENT: "Pagamento realizado via PIX.",
      PIX_REFUND: "Reembolso pagamento realizado via PIX.",
    });

    const OPERATION_SHORT = ref({
      CREDIT_CARD_ANTICIPATED_PAYABLE_PAYMENT: "Antecipação",
      CREDIT_CARD_PAYABLE_CHARGEBACK_REFUND: "Reembolso",
      CREDIT_CARD_PAYABLE_CHARGEBACK: "Chargeback",
      CREDIT_CARD_PAYABLE_PAYMENT: "Crédito",
      CREDIT_CARD_PAYABLE_REFUND: "Crédito",
      BANK_SLIP_REFUND_REVERSAL: "Reversão de reembolso",
      BANK_SLIP_REFUND_FEE: "Reembolso",
      BANK_SLIP_PAYMENT: "Boleto",
      UNKNOWN_OPERATION: "Desconhecido",
      BANK_SLIP_REFUND: "Reembolso",
      TRANSFER_PAYMENT: "Transferência",
      TRANSFER_REFUND: "Reembolso",
      PIX_PAYMENT: "PIX",
      PIX_REFUND: "Reembolso",
    });

    const TAX_ID_TYPE = ref({
      AE_TRN: "AE_TRN",
      AU_ABN: "AU_ABN",
      BR_CNPJ: "CNPJ",
      BR_CPF: "CPF",
      CA_BN: "CA_BN",
      CA_GST_HST: "CA_GST_HST",
      CA_PST_BC: "CA_PST_BC",
      CA_PST_MB: "CA_PST_MB",
      CA_PST_SK: "CA_PST_SK",
      CA_QST: "CA_QST",
      CH_VAT: "CH_VAT",
      CL_TIN: "CL_TIN",
      ES_CIF: "ES_CIF",
      EU_VAT: "EU_VAT",
      GB_VAT: "GB_VAT",
      HK_BR: "HK_BR",
      ID_NPWP: "ID_NPWP",
      IL_VAT: "IL_VAT",
      IN_GST: "IN_GST",
      JP_CN: "JP_CN",
      JP_RN: "JP_RN",
      KR_BRN: "KR_BRN",
      LI_UID: "LI_UID",
      MX_RFC: "MX_RFC",
      MY_FRP: "MY_FRP",
      MY_ITN: "MY_ITN",
      MY_SST: "MY_SST",
      NO_VAT: "NO_VAT",
      NZ_GST: "NZ_GST",
      RU_INN: "RU_INN",
      RU_KPP: "RU_KPP",
      SA_VAT: "SA_VAT",
      SG_GST: "SG_GST",
      SG_UEN: "SG_UEN",
      TH_VAT: "TH_VAT",
      TW_VAT: "TW_VAT",
      US_EIN: "US_EIN",
      ZA_VAT: "ZA_VAT",
    });

    var allOrganizations = [];
    var allRecipients = [];
    var allOperations = [];

    const organizationsOptions = ref([]);
    const selectedOrganizations = ref([]);

    const recipientsOptions = ref([]);
    const selectedRecipients = ref([]);

    const fetchOrganizations = async (page) => {
      const queryData = {
        query: `query adminFetchOrganizations($pagination: PagePaginationInput!) {
          adminFetchOrganizations(
            paginationArgs: $pagination,
          ) {
              results {
                _id
                name
              }
              hasNextPage
              currentPage
          }
        }`,
        variables: {
          pagination: {
            limit: 200,
            page: page,
          },
        },
      };

      try {
        const response = await axios.post(GRAPHQL_URL, queryData, {
          headers: HEADERS.value,
        });
        if (
          response.data &&
          response.data.data &&
          response.data.data.adminFetchOrganizations
        ) {
          return response.data.data.adminFetchOrganizations;
        } else {
          return { results: [] };
        }
      } catch (error) {
        console.error("Error fetching operations:", error);
        return null;
      }
    };

    const fetchRecipients = async (organization_id, page) => {
      const queryData = {
        query: `query adminFetchRecipients($pagination: PagePaginationInput!, $organizationId: String!) {
          adminFetchRecipients(
            organizationId: $organizationId,
            paginationArgs: $pagination,

          ) {
              results {
                _id
                name
              }
              hasNextPage
              currentPage
          }
        }`,
        variables: {
          organizationId: organization_id,
          pagination: {
            limit: 200,
            page: page,
          },
        },
      };

      try {
        const response = await axios.post(GRAPHQL_URL, queryData, {
          headers: HEADERS.value,
        });
        if (
          response.data &&
          response.data.data &&
          response.data.data.adminFetchRecipients
        ) {
          return response.data.data.adminFetchRecipients;
        } else {
          return { results: [] };
        }
      } catch (error) {
        console.error("Error fetching operations:", error);
        return null;
      }
    };

    const fetchOperations = async (organization_id, recipient_id, page) => {
      const queryData = {
        query: `query recipientBalanceOperations($pagination: PagePaginationInput!, $endDate: DateTime, $startDate: DateTime, $recipientId: String!, $organizationId: String!) {
          adminFetchRecipientBalanceOperations(
            paginationArgs: $pagination
            endDate: $endDate
            startDate: $startDate
            recipientId: $recipientId
            organizationId: $organizationId
          ) {
              results {
                type
                balanceOperation {
                  id
                  amount
                  feeAmount
                  createdAt
                }
                ... on PixPaymentOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                }
                ... on PixRefundOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                }
                ... on BankSlipPaymentOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                }
                ... on BankSlipRefundOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                }
                ... on BankSlipRefundFeeOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                }
                ... on BankSlipRefundReversalOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                }
                ... on CreditCardAnticipatedPayablePaymentOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                  payable {
                    amount
                    feeAmount
                    anticipationFeeAmount
                    installment
                  }
                }
                ... on CreditCardPayablePaymentOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                  payable {
                    amount
                    feeAmount
                    anticipationFeeAmount
                    installment
                  }
                }
                ... on CreditCardPayableRefundOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                  payable {
                    amount
                    feeAmount
                    anticipationFeeAmount
                    installment
                  }
                }
                ... on CreditCardPayableChargebackOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                  payable {
                    amount
                    feeAmount
                    anticipationFeeAmount
                    installment
                  }
                }
                ... on CreditCardPayableChargebackRefundOperation {
                  payment {
                    _id
                    amount
                    user {
                      _id
                      name
                      email
                      phoneNumber
                    }
                    userPaymentProfile {
                      name
                      address {
                        zipcode
                        country
                        city
                        state
                        neighborhood
                        street
                        number
                        complement
                      }
                      taxIds {
                        type
                        value
                      }
                    }
                  }
                  payable {
                    amount
                    feeAmount
                    anticipationFeeAmount
                    installment
                  }
                }
              }
              currentPage
              hasNextPage
            }
          }`,
        variables: {
          startDate: START_DATE.value,
          endDate: END_DATE.value,
          organizationId: organization_id,
          pagination: {
            limit: 20,
            page: page,
          },
          recipientId: recipient_id,
        },
      };

      try {
        const response = await axios.post(GRAPHQL_URL, queryData, {
          headers: HEADERS.value,
        });
        if (
          response.data &&
          response.data.data &&
          response.data.data.adminFetchRecipientBalanceOperations
        ) {
          return response.data.data.adminFetchRecipientBalanceOperations;
        } else {
          return { results: [] };
        }
      } catch (error) {
        console.error("Error fetching operations:", error);
        return null;
      }
    };

    function formatTypeShort(type) {
      return OPERATION_SHORT.value[type] || "Operação desconhecida";
    }

    function formatTaxIdType(taxIdType) {
      return TAX_ID_TYPE.value[taxIdType] || "N/A";
    }

    function formatTypeDescription(type, installment) {
      const description =
        OPERATION_DESCRIPTION.value[type] || "Operação desconhecida.";
      return typeof installment === "number"
        ? description.replace("{0}", installment)
        : description;
    }

    const formatCreditCardAnticipatedPayablePayment = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber || "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(
          row.type,
          row.payable.installment
        ),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: row.payable?.amount / 100 || "",
        payable_feeAmount: (row.payable?.feeAmount / 100) * -1 || "",
        payable_anticipationFeeAmount:
          (row.payable?.anticipationFeeAmount / 100) * -1 || "",
        payable_installment: row.payable.installment,
      };
    };

    const formatCreditCardPayableChargebackRefund = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber || "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(
          row.type,
          row.payable.installment
        ),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: row.payable?.amount / 100 || "",
        payable_feeAmount: (row.payable?.feeAmount / 100) * -1 || "",
        payable_anticipationFeeAmount:
          (row.payable?.anticipationFeeAmount / 100) * -1 || "",
        payable_installment: row.payable.installment,
      };
    };

    const formatCreditCardPayableChargeback = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber || "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(
          row.type,
          row.payable.installment
        ),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: row.payable?.amount / 100 || "",
        payable_feeAmount: (row.payable?.feeAmount / 100) * -1 || "",
        payable_anticipationFeeAmount:
          (row.payable?.anticipationFeeAmount / 100) * -1 || "",
        payable_installment: row.payable.installment,
      };
    };

    const formatCreditCardPayablePayment = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber || "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(
          row.type,
          row.payable.installment
        ),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: row.payable?.amount / 100 || "",
        payable_feeAmount: (row.payable?.feeAmount / 100) * -1 || "",
        payable_anticipationFeeAmount:
          (row.payable?.anticipationFeeAmount / 100) * -1 || "",
        payable_installment: row.payable.installment,
      };
    };

    const formatCreditCardPayableRefund = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber || "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(
          row.type,
          row.payable.installment
        ),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: row.payable?.amount / 100 || "",
        payable_feeAmount: (row.payable?.feeAmount / 100) * -1 || "",
        payable_anticipationFeeAmount:
          (row.payable?.anticipationFeeAmount / 100) * -1 || "",
        payable_installment: row.payable.installment,
      };
    };

    const formatBankSlipRefundReversal = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber,
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatBankSlipRefundFee = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber,
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatBankSlipPayment = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber,
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatUnknowOperation = (row) => {
      return {
        _id: "",
        createdAt: "",
        user_name: "",
        user_email: "",
        user_phone: "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: "",
        operation_value: "",
        operation_feeAmount: "",
        payer_name: "",
        payer_address_zipcode: "",
        payer_address_country: "",
        payer_address_city: "",
        payer_address_state: "",
        payer_address_neighborhood: "",
        payer_address_street: "",
        payer_address_number: "",
        payer_address_complement: "",
        payer_tax_ids_type: "",
        payer_tax_ids_value: "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatBankSlipRefund = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber,
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatTransferPayment = (row) => {
      return {
        _id: "",
        createdAt: row.balanceOperation.createdAt,
        user_name: "",
        user_email: "",
        user_phone: "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: "",
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: "",
        payer_address_zipcode: "",
        payer_address_country: "",
        payer_address_city: "",
        payer_address_state: "",
        payer_address_neighborhood: "",
        payer_address_street: "",
        payer_address_number: "",
        payer_address_complement: "",
        payer_tax_ids_type: "",
        payer_tax_ids_value: "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatTransferRefund = (row) => {
      return {
        _id: "",
        createdAt: row.balanceOperation.createdAt,
        user_name: "",
        user_email: "",
        user_phone: "",
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: "",
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: "",
        payer_address_zipcode: "",
        payer_address_country: "",
        payer_address_city: "",
        payer_address_state: "",
        payer_address_neighborhood: "",
        payer_address_street: "",
        payer_address_number: "",
        payer_address_complement: "",
        payer_tax_ids_type: "",
        payer_tax_ids_value: "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatPixPayment = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber,
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const formatPixRefund = (row) => {
      return {
        _id: row.payment._id,
        createdAt: row.balanceOperation.createdAt,
        user_name: row.payment.user.name,
        user_email: row.payment.user.email,
        user_phone: row.payment.user.phoneNumber,
        typeShort: formatTypeShort(row.type),
        typeDescription: formatTypeDescription(row.type),
        payment_value: row.payment.amount / 100,
        operation_value:
          row.balanceOperation.amount / 100 +
          (row.balanceOperation.feeAmount / 100) * -1,
        //operation_feeAmount: (row.balanceOperation.feeAmount / 100) * -1,
        payer_name: row.payment.userPaymentProfile?.name || "",
        payer_address_zipcode:
          row.payment.userPaymentProfile?.address?.zipcode || "",
        payer_address_country:
          row.payment.userPaymentProfile?.address?.country || "",
        payer_address_city: row.payment.userPaymentProfile?.address?.city || "",
        payer_address_state:
          row.payment.userPaymentProfile?.address?.state || "",
        payer_address_neighborhood:
          row.payment.userPaymentProfile?.address?.neighborhood || "",
        payer_address_street:
          row.payment.userPaymentProfile?.address?.street || "",
        payer_address_number:
          row.payment.userPaymentProfile?.address?.number || "",
        payer_address_complement:
          row.payment.userPaymentProfile?.address?.complement || "",
        payer_tax_ids_type:
          formatTaxIdType(row.payment.userPaymentProfile?.taxIds?.[0].type) ||
          "",
        payer_tax_ids_value:
          row.payment.userPaymentProfile?.taxIds?.[0].value || "",
        payable_amount: "",
        payable_feeAmount: "",
        payable_anticipationFeeAmount: "",
        payable_installment: "",
      };
    };

    const FORMAT_DICT = ref({
      CREDIT_CARD_ANTICIPATED_PAYABLE_PAYMENT:
        formatCreditCardAnticipatedPayablePayment,
      CREDIT_CARD_PAYABLE_CHARGEBACK_REFUND:
        formatCreditCardPayableChargebackRefund,
      CREDIT_CARD_PAYABLE_CHARGEBACK: formatCreditCardPayableChargeback,
      CREDIT_CARD_PAYABLE_PAYMENT: formatCreditCardPayablePayment,
      CREDIT_CARD_PAYABLE_REFUND: formatCreditCardPayableRefund,
      BANK_SLIP_REFUND_REVERSAL: formatBankSlipRefundReversal,
      BANK_SLIP_REFUND_FEE: formatBankSlipRefundFee,
      BANK_SLIP_PAYMENT: formatBankSlipPayment,
      UNKNOWN_OPERATION: formatUnknowOperation,
      BANK_SLIP_REFUND: formatBankSlipRefund,
      TRANSFER_PAYMENT: formatTransferPayment,
      TRANSFER_REFUND: formatTransferRefund,
      PIX_PAYMENT: formatPixPayment,
      PIX_REFUND: formatPixRefund,
    });

    const fetchOrganizationsOptions = async () => {
      let organizationPage = 1;
      let organizationHasNextPage = true;
      organizationsOptions.value = [];

      while (organizationHasNextPage) {
        const organizations = await fetchOrganizations(organizationPage);
        organizationsOptions.value.push(...organizations.results);
        organizationHasNextPage = organizations.hasNextPage;
        organizationPage++;
      }

      for (const i in organizationsOptions.value) {
        organizationsOptions.value[i] = {
          label: organizationsOptions.value[i].name,
          value: organizationsOptions.value[i]._id,
        };
      }
    };

    const fetchRecipientsOptions = async () => {
      recipientsOptions.value = [];
      selectedRecipients.value = [];

      for (const org of selectedOrganizations.value) {
        let recipientPage = 1;
        let recipientHasNextPage = true;

        while (recipientHasNextPage) {
          const recipients = await fetchRecipients(org.value, recipientPage);
          for (const i in recipients.results) {
            recipientsOptions.value.push({
              label: recipients.results[i].name,
              value: recipients.results[i]._id,
              org: org.value,
            });
          }
          recipientHasNextPage = recipients.hasNextPage;
          recipientPage++;
        }
      }
    };

    const fetchAllData = async () => {
      fetchAllDataBtnLoading.value = true;
      rows.value = [];
      allOperations = [];
      for (const recipient of selectedRecipients.value) {
        let operationPage = 1;
        let operationHasNextPage = true;

        while (operationHasNextPage) {
          const operations = await fetchOperations(
            recipient.org,
            recipient.value,
            operationPage
          );
          allOperations.push(...operations.results);
          operationHasNextPage = operations.hasNextPage;
          operationPage++;
        }
      }

      rows.value = allOperations;

      for (const i in rows.value) {
        rows.value[i] = FORMAT_DICT.value[rows.value[i].type](rows.value[i]);
      }

      tableLoaded.value = true;
      fetchAllDataBtnLoading.value = false;
    };

    const exportToExcel = () => {
      const wb = utils.book_new();
      const ws = utils.json_to_sheet(rows.value);
      utils.book_append_sheet(wb, ws, "Sheet1");

      const headers = columns.value.map((column) => column.label);

      utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

      const currentDate = new Date();
      const dd = String(currentDate.getDate()).padStart(2, "0");
      const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
      const yyyy = currentDate.getFullYear();

      const formattedDate = `${dd}_${mm}_${yyyy}`;

      const filename = `relatório_transacional_${formattedDate}.xlsx`;

      writeFile(wb, filename);
    };

    fetchOrganizationsOptions();

    return {
      fetchAllData,
      exportToExcel,
      organizationsOptions,
      selectedOrganizations,
      fetchRecipientsOptions,
      selectedRecipients,
      fetchAllDataBtnLoading,
      recipientsOptions,
      START_DATE,
      END_DATE,
      tableLoaded,
      rows,
      columns,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
});
</script>
