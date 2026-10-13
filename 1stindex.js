
function checkLoanEligibility(customer) {
  const { customerId, employmentType, monthlyIncome, creditScore, existingEmi, requestedLoanAmount } = customer;
  
  // Permissible EMI limit: Existing EMI should not exceed 50% of monthly income
  const isEmiValid = existingEmi <= monthlyIncome * 0.5;
  
  let eligibility = "Not Eligible";
  let category = "Not Applicable";
  let remarks = "Meets minimum requirements";

  if (!isEmiValid) {
    remarks = "Existing EMI exceeds permissible limit (50% of income)";
  } else if (employmentType.toLowerCase() === "salaried" && creditScore >= 750 && monthlyIncome >= 30000) {
    eligibility = "Eligible";
    category = "Standard Loan";
  } else if (creditScore >= 650 && creditScore <= 749) {
    eligibility = "Eligible";
    category = "Restricted Category";
  } else {
    remarks = "Credit score or income below minimum requirements";
  }

  // Expected Output format
  return {
    "Customer ID": customerId,
    "Employment Type": employmentType,
    "Monthly Income": `₹${monthlyIncome}`,
    "Credit Score": creditScore,
    "Existing EMI": `₹${existingEmi}`,
    "Loan Eligibility": eligibility,
    "Eligibility Category": category,
    "Remarks": remarks
  };
}

// Example usage:
const applicant = {
  customerId: "CUST1001",
  employmentType: "Salaried",
  monthlyIncome: 45000,
  requestedLoanAmount: 200000,
  existingEmi: 10000,
  creditScore: 760
};

console.log(checkLoanEligibility(applicant));