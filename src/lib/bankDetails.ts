import type { BankCurrency } from '@/store/orderStore'

export interface BankAccount {
  currency:     BankCurrency
  flag:         string   // emoji flag
  accountName:  string
  fields:       { label: string; value: string }[]
  bankAddress:  string
}

export const BANK_ACCOUNTS: Record<BankCurrency, BankAccount> = {
  USD: {
    currency:    'USD',
    flag:        '🇺🇸',
    accountName: '辉勇 邓',
    fields: [
      { label: 'Routing Number',  value: '084009519'          },
      { label: 'Account Number',  value: '832487443930778'     },
      { label: 'SWIFT / BIC',    value: 'TRWIUS35XXX'         },
    ],
    bankAddress: 'Wise US Inc, 108 W 13th St, Wilmington, DE, 19801, United States',
  },
  GBP: {
    currency:    'GBP',
    flag:        '🇬🇧',
    accountName: '辉勇 邓',
    fields: [
      { label: 'Sort Code',       value: '23-08-01'            },
      { label: 'Account Number',  value: '78147853'            },
      { label: 'IBAN',            value: 'GB31 TRWI 2308 0178 1478 53' },
      { label: 'SWIFT / BIC',    value: 'TRWIGB2LXXX'         },
    ],
    bankAddress: 'Wise Payments Limited, 1st Floor, Worship Square, 65 Clifton Street, London, EC2A 4JE, United Kingdom',
  },
  EUR: {
    currency:    'EUR',
    flag:        '🇪🇺',
    accountName: '辉勇 邓',
    fields: [
      { label: 'IBAN',            value: 'BE69 9055 7030 8978' },
      { label: 'SWIFT / BIC',    value: 'TRWIBEB1XXX'         },
    ],
    bankAddress: 'Wise, Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium',
  },
  AUD: {
    currency:    'AUD',
    flag:        '🇦🇺',
    accountName: '辉勇 邓',
    fields: [
      { label: 'BSB',             value: '774-001'             },
      { label: 'Account Number',  value: '233357301'           },
      { label: 'SWIFT / BIC',    value: 'TRWIAUS1XXX'         },
    ],
    bankAddress: 'Wise Australia Pty Ltd, Suite 1, Level 11, 66 Goulburn Street, Sydney, NSW, 2000, Australia',
  },
}

export const BANK_CURRENCIES: BankCurrency[] = ['USD', 'GBP', 'EUR', 'AUD']
