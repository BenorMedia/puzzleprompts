/**
 * Puzzle AI Close Prompt Library — Open (No Gate)
 * Standalone JS for Webflow embed
 */

// ============================================
// PROMPTS DATA (with updated Bank Statement prompt)
// ============================================
const PROMPTS = [
  { id: "bank-rec-pdf", title: "Bank Statement Transaction Extraction & Reconciliation", description: "Extract transactions from a bank statement PDF with row-by-row running balance validation, control total reconciliation, and structured CSV export", category: "Accounting", tags: ["Reconciliation", "Bank Statements", "Transaction Extraction"] },
  { id: "ap-match-bills", title: "Match Unpaid Bills to Payments", description: "Identify unpaid bills and propose ready-to-post cash applications", category: "Accounting", tags: ["Accounts Payable", "Bills & Invoices"] },
  { id: "ap-review", title: "A/P Review", description: "Analyze Accounts Payable balances and reconcile aging report vs. balance sheet", category: "Accounting", tags: ["Accounts Payable", "Bills & Invoices"] },
  { id: "ar-match-invoices", title: "Match Unpaid Invoices to Receipts", description: "Identify unpaid invoices and propose ready-to-post cash receipts", category: "Accounting", tags: ["Accounts Receivable", "Bills & Invoices"] },
  { id: "ar-review", title: "A/R Review", description: "Analyze Accounts Receivable balances and reconcile aging report vs. balance sheet", category: "Accounting", tags: ["Accounts Receivable", "Bills & Invoices"] },
  { id: "accruals-unbilled", title: "Identify & Draft Unbilled Accruals", description: "Identify unbilled costs to accrue using expense patterns and draft journal entries", category: "Accounting", tags: ["Accruals", "Bills & Invoices"] },
  { id: "journal-entry-review", title: "Journal Entry Review & Anomaly Detection", description: "Flag risky journal entries based on amount, time, and user posting patterns", category: "Accounting", tags: ["Journal Entries", "Accuracy Review"] },
  { id: "prepaids", title: "Prepaids Review", description: "Review existing prepaid schedules and identify potential new prepaids", category: "Accounting", tags: ["Prepaids", "Month-End Close"] },
  { id: "fixed-assets", title: "Identify & Draft Fixed Assets", description: "Identify and propose fixed asset entries for large transactions", category: "Accounting", tags: ["Fixed Assets", "Accruals"] },
  { id: "payroll-csv", title: "Process CSV Payroll Reports", description: "Extract payroll costs and draft journal entry using an uploaded payroll CSV", category: "Accounting", tags: ["Payroll", "Upload"] },
  { id: "transaction-audit", title: "Transaction Audit", description: "Flag transactions matching risk patterns: miscategorization, anomalies, duplicates", category: "Accounting", tags: ["Transactions", "Month-End Close"] },
  { id: "internal-transfers", title: "Internal Transfers Review", description: "Identify and reconcile internal transfers between accounts", category: "Accounting", tags: ["Reconciliation", "Transactions"] },
  { id: "data-quality", title: "Data Quality Check", description: "Identify missing, incomplete, or inconsistent data across the GL", category: "Accounting", tags: ["Accuracy Review", "Month-End Close"] },
  { id: "vendor-inconsistencies", title: "Vendor Coding Inconsistencies", description: "Find vendors coded to multiple accounts and standardize", category: "Accounting", tags: ["Transactions", "Accuracy Review"] },
  { id: "uncategorized-transactions", title: "Uncategorized Transaction Review", description: "Categorize uncategorized transactions using historical patterns", category: "Accounting", tags: ["Transactions", "Reconciliation"] },
  { id: "pdf-to-csv", title: "PDF to CSV Extraction", description: "Extract structured financial data from PDF statements into CSV format", category: "Accounting", tags: ["Document Upload", "Transactions"] },
  { id: "receipt-capture", title: "Receipt & Invoice Data Capture", description: "Extract key data fields from uploaded receipts or invoices", category: "Accounting", tags: ["Document Upload", "Accounts Payable"] },
  { id: "client-call-prep", title: "Client Call Prep", description: "Generate a pre-call briefing with key financial talking points", category: "Insights", tags: ["Advisory", "Client Communication"] },
  { id: "month-end-summary", title: "Month-End Executive Summary", description: "Generate a client-ready financial summary for the month", category: "Insights", tags: ["Advisory", "Month-End Close"] },
  { id: "cash-flow-forecast", title: "Cash Flow Forecast", description: "Project cash position for the next 30/60/90 days based on trends", category: "Insights", tags: ["Advisory", "Cash Flow"] },
  { id: "variance-analysis", title: "Variance Analysis", description: "Compare actuals vs. budget and explain significant variances", category: "Insights", tags: ["Advisory", "Financial Analysis"] },
  { id: "kpi-dashboard", title: "KPI Dashboard Brief", description: "Generate a snapshot of key performance indicators for client review", category: "Insights", tags: ["Advisory", "Financial Analysis"] },
  { id: "tax-planning-notes", title: "Tax Planning Notes", description: "Identify tax-relevant transactions and planning opportunities", category: "Insights", tags: ["Tax", "Advisory"] },
  { id: "revenue-recognition", title: "Revenue Recognition Review", description: "Analyze revenue streams for proper recognition timing and compliance", category: "Insights", tags: ["Revenue", "Compliance"] },
  { id: "expense-trend", title: "Expense Trend Analysis", description: "Identify spending trends and anomalies across expense categories", category: "Insights", tags: ["Advisory", "Financial Analysis"] },
  { id: "client-onboarding", title: "Client Onboarding Checklist", description: "Generate a structured onboarding checklist for new accounting clients", category: "Insights", tags: ["Client Communication", "Advisory"] },
  { id: "profitability-analysis", title: "Profitability Analysis", description: "Break down profitability by product line, department, or client segment", category: "Insights", tags: ["Advisory", "Financial Analysis"] },
  { id: "compliance-checklist", title: "Compliance Checklist", description: "Generate a period-end compliance and regulatory checklist", category: "Insights", tags: ["Compliance", "Month-End Close"] },
  { id: "advisory-opportunity", title: "Advisory Opportunity Finder", description: "Identify high-value advisory opportunities from client financial data", category: "Insights", tags: ["Advisory", "Client Communication"] },
];

// ============================================
// RENDER PROMPT CARDS
// ============================================
function renderPrompts(filter, search) {
  var grid = document.getElementById('promptsGrid');
  var countEl = document.getElementById('promptsCount');
  if (!grid) return;

  var filtered = PROMPTS;

  if (filter && filter !== 'All') {
    filtered = filtered.filter(function(p) { return p.category === filter; });
  }

  if (search) {
    var q = search.toLowerCase();
    filtered = filtered.filter(function(p) {
      return p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(function(t) { return t.toLowerCase().includes(q); });
    });
  }

  if (countEl) {
    countEl.textContent = 'Showing ' + filtered.length + ' prompt' + (filtered.length !== 1 ? 's' : '');
  }

  grid.innerHTML = filtered.map(function(p) {
    return '<div class="prompt-card">' +
      '<div class="prompt-card-tags">' +
        '<span class="prompt-tag prompt-tag-category">' + p.category + '</span>' +
        p.tags.map(function(t) { return '<span class="prompt-tag prompt-tag-default">' + t + '</span>'; }).join('') +
      '</div>' +
      '<h3 class="prompt-card-title">' + p.title + '</h3>' +
      '<p class="prompt-card-desc">' + p.description + '</p>' +
    '</div>';
  }).join('');
}

// ============================================
// FILTER TABS
// ============================================
var activeFilter = 'All';

document.querySelectorAll('.filter-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    activeFilter = tab.dataset.filter;
    renderPrompts(activeFilter, document.getElementById('searchInput').value);
  });
});

// ============================================
// SEARCH
// ============================================
var searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    renderPrompts(activeFilter, e.target.value);
  });
}

// ============================================
// INITIAL RENDER
// ============================================
renderPrompts('All', '');
