# Customer Validation CSV Script

A Node.js script designed to compare and validate customer handles between two specific CSV files. This script was specifically created to cross-reference customer handles from a Customer Success CSV file against a Post SGTV import sheet to identify matching records and their frequencies.

## Original Purpose
This script was developed to validate customer data during the SGTV migration process, specifically to:
- Compare customer handles from a Customer Success export
- Cross-reference these handles against a Post SGTV import sheet
- Identify and count matching records
- Generate a summary of matches for data validation

## Prerequisites

- Node.js (Download from [nodejs.org](https://nodejs.org/))
- Two CSV files with a `sold_to_handle` column:
  1. `customer-success.csv`
  2. `Post SGTV 11_05 - Import Sheet - in progress (1).csv` 