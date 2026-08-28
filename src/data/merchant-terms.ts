import type { LegalDoc } from "@/data/legal";

function p(...texts: string[]): string {
  return texts.map((text) => `<p>${text}</p>`).join("");
}

function h2(title: string, ...texts: string[]): string {
  return `<h2>${title}</h2>${p(...texts)}`;
}

const DEFINITIONS: ReadonlyArray<{ term: string; meaning: string }> = [
  {
    term: "Accelerated Damages",
    meaning:
      "“Accelerated Damages” means, in the event of a Bad Faith Breach by the Merchant, the sum of (i) all unpaid Offer Reimbursements, (ii) the Early Termination Fee for the remainder of the Term, (iii) any Dispute Fees, collection costs, and attorneys’ fees, and (iv) liquidated damages in the amount of Seven Thousand Five Hundred Dollars ($7,500). The Merchant agrees that this amount is a reasonable estimate of Carrot’s damages and is not a penalty.",
  },
  {
    term: "Activation",
    meaning:
      "“Activation” means the act of an offer being triggered or made available to a consumer within the Carrot Network, regardless of the specific user interface action (including, without limitation, clicking, viewing, swiping, or automatic activation).",
  },
  {
    term: "Affiliate",
    meaning:
      "“Affiliate” means any entity that directly or indirectly controls, is controlled by, or is under common control with Carrot, including any successor entity, acquirer, or rebranded company.",
  },
  {
    term: "Arbitration",
    meaning:
      "“Arbitration” means the mandatory binding arbitration process that the parties agree to use instead of going to court for any disputes arising under this Agreement.",
  },
  {
    term: "Authorized Representative",
    meaning:
      "“Authorized Representative” means any individual who accepts or signs the Enrollment Agreement on behalf of the Merchant. The Merchant represents and warrants that the person accepting the Enrollment Agreement has full actual and apparent authority to bind the Merchant, and the Merchant waives any right to challenge the validity of the Agreement based on lack of authority of the signatory.",
  },
  {
    term: "Bad Faith Breach",
    meaning:
      "“Bad Faith Breach” means any act or omission by the Merchant, including without limitation, the improper disputing of valid Offer Reimbursements, refusal to pay amounts owed, blocking Carrot’s ability to charge the Payment Method, or any other intentional attempt to avoid or evade its obligations under this Agreement.",
  },
  {
    term: "Campaign",
    meaning:
      "“Campaign” means the Merchant’s participation in Carrot’s cashback program as described in the Enrollment Agreement and governed by these Terms.",
  },
  {
    term: "Carrot Determination",
    meaning:
      "“Carrot Determination” means any determination made by Carrot, in its sole discretion, regarding whether a transaction qualifies as a Qualifying Transaction, the calculation of any Offer Amount, or any other matter relating to the operation of the program. All Carrot Determinations shall be final and binding on the Merchant, except in cases where Carrot determines in its sole discretion that a transaction was incorrectly attributed to the Merchant, in which case Carrot may, in its sole discretion, issue a statement credit.",
  },
  {
    term: "Carrot Network",
    meaning:
      "“Carrot Network” means the collective ecosystem through which Carrot distributes, presents, or activates offers, including without limitation the Carrot App, website, and any current or future partners, banks, financial institutions, fintech companies, platforms, or other channels with which Carrot has a relationship.",
  },
  {
    term: "Chargeback",
    meaning:
      "“Chargeback” means any dispute, reversal, or chargeback initiated by the Merchant or its bank against any charge made by Carrot to the Merchant’s Payment Method.",
  },
  {
    term: "Class Action Waiver",
    meaning:
      "“Class Action Waiver” means the Merchant’s agreement not to participate in any class action lawsuit or representative action against Carrot.",
  },
  {
    term: "Dispute Fees",
    meaning:
      "“Dispute Fees” means any fees or charges imposed on Carrot by its payment processor, bank, or financial institution as a result of a chargeback, dispute, or reversal initiated by the Merchant.",
  },
  {
    term: "Early Termination Fee",
    meaning:
      "“Early Termination Fee” means a fee equal to the Monthly Commitment Amount multiplied by the number of months remaining in the then-current Term, which Carrot may, in its sole discretion, elect to charge the Merchant upon early termination of this Agreement.",
  },
  {
    term: "Effective Date",
    meaning:
      "“Effective Date” means the date the Merchant executes or electronically accepts the Enrollment Agreement, or the date the Merchant’s first cashback offer goes live on the Carrot Network, whichever is later.",
  },
  {
    term: "Enrollment Agreement",
    meaning:
      "“Enrollment Agreement” means the individualized Carrot Merchant Enrollment Agreement executed (or electronically accepted) by the Merchant, which identifies the specific products and services being purchased (including Snapshot and/or the cashback program), the applicable Offer Parameters, pricing, and other commercial terms, and incorporates these Terms by reference.",
  },
  {
    term: "Force Majeure",
    meaning:
      "“Force Majeure” means any event beyond Carrot’s reasonable control, including but not limited to acts of God, natural disasters, pandemics, government actions, power failures, internet disruptions, or labor disputes.",
  },
  {
    term: "Including Without Limitation",
    meaning:
      "“Including Without Limitation” means that the use of the word “including” or “include” shall not be construed as limiting the generality of the preceding words.",
  },
  {
    term: "Location",
    meaning:
      "“Location” means the specific physical business location identified in the Enrollment Agreement, regardless of the legal entity that owns or operates it.",
  },
  {
    term: "Merchant",
    meaning:
      "“Merchant” means the business entity or individual identified in the Enrollment Agreement, including any DBA, trade name, or Google listing name associated with the location, and any successor, assignee, or subsequent owner of the business operating at that location.",
  },
  {
    term: "Merchant Dashboard",
    meaning:
      "“Merchant Dashboard” means the online portal provided by Carrot that allows Merchants to view their Weekly Statements, Qualifying Transaction details, and campaign performance.",
  },
  {
    term: "Merchant License",
    meaning:
      "“Merchant License” means the non-exclusive, royalty-free, irrevocable, worldwide license granted by the Merchant to Carrot and its partners to use, reproduce, display, modify, adapt, and distribute the Merchant Materials for the purpose of promoting the Merchant’s business, operating the Snapshot product, presenting offers through the Carrot Network, and fulfilling Carrot’s obligations under this Agreement. The Merchant represents that it has all necessary rights to grant this license and waives any claims related to Carrot’s use of publicly available Merchant Materials.",
  },
  {
    term: "Merchant Materials",
    meaning:
      "“Merchant Materials” means any and all names, logos, trademarks, service marks, photographs, images, descriptions, location data, and other materials relating to the Merchant that are publicly available or provided to Carrot, whether by the Merchant or obtained by Carrot from third-party sources.",
  },
  {
    term: "Monthly Commitment Amount",
    meaning:
      "“Monthly Commitment Amount” means the amount used to calculate the Early Termination Fee, which shall be the greater of (i) $200 per month, or (ii) the average monthly Offer Reimbursement over the preceding three (3) months, or such other amount as may be specified in the Enrollment Agreement.",
  },
  {
    term: "Offer Amount",
    meaning:
      "“Offer Amount” means the total amount the Merchant is required to pay Carrot for each Qualifying Transaction, as determined by Carrot in its sole discretion, which shall include both the Reward Amount paid or credited to the consumer and any platform fees, partner fees, acquisition costs, or other fees retained by Carrot or its partners.",
  },
  {
    term: "Offer Parameters",
    meaning:
      "“Offer Parameters” means the limits and restrictions specified by the Merchant in the Enrollment Agreement, including without limitation a maximum cashback rate, maximum savings amount per transaction, minimum spend amount, customer acquisition limit, and use-again period. Carrot shall have the right, in its sole discretion, to create, modify, and deliver dynamic offers to consumers within the bounds of the Offer Parameters. All offers shall be considered dynamic unless the Enrollment Agreement expressly states that a static offer will apply.",
  },
  {
    term: "Offer Reimbursement",
    meaning:
      "“Offer Reimbursement” means the total aggregate amount owed by the Merchant for all Qualifying Transactions during a given period.",
  },
  {
    term: "Payment Authorization",
    meaning:
      "“Payment Authorization” means the Merchant’s express authorization for Carrot to charge the Merchant’s Payment Method for all Offer Reimbursements, Early Termination Fees, Dispute Fees, and any other amounts owed under this Agreement on a recurring basis.",
  },
  {
    term: "Payment Method",
    meaning:
      "“Payment Method” means any valid credit card, debit card, ACH authorization, or other payment method provided by the Merchant to Carrot, or otherwise associated with the Merchant’s account, which Carrot is authorized to charge for all amounts owed under this Agreement.",
  },
  {
    term: "Qualifying Transaction",
    meaning:
      "“Qualifying Transaction” means a purchase of goods or services from the Merchant, whether made in person or online, using a payment card associated with the Carrot Network, that occurs after an offer has been activated and that Carrot determines, in its sole discretion, satisfies the applicable Offer Parameters.",
  },
  {
    term: "Ramp-Down Period",
    meaning:
      "“Ramp-Down Period” means the period following termination or suspension of a Campaign during which the Merchant remains responsible for paying Offer Reimbursements for Qualifying Transactions resulting from offers activated prior to the termination or suspension date.",
  },
  {
    term: "Recurring Charges",
    meaning:
      "“Recurring Charges” means the automatic charges to the Merchant’s Payment Method for Offer Reimbursements as they are incurred, typically processed on a weekly basis.",
  },
  {
    term: "Reconciliation",
    meaning:
      "“Reconciliation” means the process by which the Merchant reviews transaction details provided in the Weekly Statement to verify Qualifying Transactions.",
  },
  {
    term: "Reward Amount",
    meaning:
      "“Reward Amount” means the cashback amount that Carrot pays or credits to the consumer from the Offer Amount.",
  },
  {
    term: "Snapshot",
    meaning:
      "“Snapshot” means Carrot’s neighborhood marketing product, which may be provided in printed physical form, digital form, or both, featuring participating Merchants with business information, photography, category designation, and a QR code linking to a digital profile page.",
  },
  {
    term: "Sole Discretion",
    meaning:
      "“Sole Discretion” means Carrot’s absolute right to make any determination, decision, or election under this Agreement, without any obligation to act reasonably, provide justification, or obtain the Merchant’s consent.",
  },
  {
    term: "Successor",
    meaning:
      "“Successor” means any subsequent owner, purchaser, or operator of the business or Location, whether through sale, transfer, assignment, or any other means. Any Successor shall be bound by the terms of this Agreement.",
  },
  {
    term: "Term",
    meaning:
      "“Term” means an initial period of twelve (12) months from the Effective Date, which shall automatically renew for successive twelve (12) month periods unless the Merchant provides written notice of its intent not to renew at least thirty (30) days prior to the expiration of the then-current Term.",
  },
  {
    term: "Weekly Billing Cycle",
    meaning:
      "“Weekly Billing Cycle” means the seven-day period used by Carrot to aggregate Qualifying Transactions and generate Weekly Statements, typically running from Friday to the following Thursday.",
  },
  {
    term: "Weekly Statement",
    meaning:
      "“Weekly Statement” means the weekly report and invoice issued by Carrot to the Merchant detailing all Qualifying Transactions attributed to the Merchant during the applicable period, the corresponding Offer Reimbursements owed, and any other charges.",
  },
];

export const MERCHANT_TERMS: LegalDoc = {
  title: "Merchant terms and conditions",
  lastUpdated: "August 28, 2026",
  intro: p(
    "These Carrot Merchant Terms and Conditions (“Terms”) are entered into by and between Carrot Company Limited, USA, a Delaware Corporation (also referred to as “Carrot”) and the Merchant identified in the Enrollment Agreement. By executing or electronically accepting the Enrollment Agreement, the Merchant agrees to be bound by these Terms.",
  ),
  sections: [
    {
      id: "definitions",
      title: "1. Definitions",
      html:
        p(
          "All capitalized terms used in these Terms shall have the meanings set forth below:",
        ) +
        DEFINITIONS.map((item) => h2(item.term, item.meaning)).join(""),
    },
    {
      id: "the-program",
      title: "2. The Program",
      html: p(
        "Carrot operates a performance-based customer acquisition program that enables Merchants to offer cashback incentives to consumers through the Carrot Network. Carrot shall have the right, in its sole discretion, to determine how and where offers are distributed and activated within the Carrot Network. Carrot may distribute and activate offers through any portion of the Carrot Network without additional notice to or approval from the Merchant. Subject to the Offer Parameters agreed to in the Enrollment Agreement, Carrot shall have sole discretion to determine the timing, value, and activation methods of all offers presented to consumers within the Carrot Network.",
      ),
    },
    {
      id: "qualifying-transactions",
      title: "3. Qualifying Transactions & Determinations",
      html:
        h2(
          "3.1 Carrot Determinations.",
          "Carrot and its network partners shall determine whether a transaction qualifies as a Qualifying Transaction. All Carrot Determinations shall be final and binding on the Merchant. The Merchant shall have no right to dispute, chargeback, or seek a refund for any Qualifying Transaction, except in cases where Carrot, in its sole discretion, determines that an error was made.",
        ) +
        h2(
          "3.2 Transaction Matching and Merchant Cooperation.",
          "Carrot determines Qualifying Transactions using a combination of statement descriptors, transaction location, address, zip code, Merchant ID (MID), and other available data points. The Merchant agrees to provide accurate and current information necessary for proper transaction matching, including its statement descriptor and MID. The Merchant shall promptly notify Carrot in writing of any changes to its statement descriptor, MID, or other relevant information.",
          "Carrot and its authorized representatives may conduct one or more test transactions at the Merchant’s Location for the purpose of capturing statement descriptor, MID, and related matching data. The Merchant agrees to honor such transactions in the ordinary course of business. Upon reasonable request by Carrot, the Merchant shall refund the amount of any such test transaction.",
          "If Carrot is unable to reliably match transactions due to inaccurate or outdated information, or if the Merchant fails to provide reasonable cooperation with test transactions, Carrot may request additional cooperation, delay activation of the Merchant’s offers, or suspend the Campaign until matching data can be reliably obtained. The Merchant agrees to provide such cooperation in a timely manner.",
        ) +
        h2(
          "3.3 Transaction Reporting and Timing.",
          "The Merchant acknowledges that transaction data is dependent on reporting from financial institutions, network partners, and consumers. Carrot makes no representations or guarantees regarding the timing of when transactions will be reported or become available. Qualifying Transactions may be reported and billed significantly after the original purchase date, including up to ninety (90) days later or longer. The Merchant agrees to pay for all Qualifying Transactions when they are reported, regardless of how much time has passed since the original transaction date.",
        ) +
        h2(
          "3.4 Activation and Liability.",
          "An offer shall be deemed activated when it is triggered or made available to a consumer within the Carrot Network, regardless of the method of activation (including, without limitation, by click, view, swipe, or automatic activation). Upon Activation of an offer, the Merchant shall be fully responsible for the Offer Amount for any resulting Qualifying Transaction, regardless of whether the offer was activated through the Carrot App or through any third-party partner or channel within the Carrot Network.",
        ),
    },
    {
      id: "offer-parameters",
      title: "4. Offer Parameters and Merchant Limits",
      html: p(
        "The Merchant shall specify its desired Offer Parameters in the Enrollment Agreement, including maximum cashback rate, maximum savings amount, minimum spend, customer limits, and use-again period. Carrot may vary offers dynamically within these parameters. If the Merchant fails to specify any Offer Parameters, or sets any parameter to zero, “none,” or leaves it blank, Carrot shall have full discretion to determine all aspects of the Offer with no restrictions.",
        "All offers shall be considered dynamic unless the Enrollment Agreement expressly states that a static offer will apply.",
      ),
    },
    {
      id: "billing-and-payment",
      title: "5. Billing and Payment Terms",
      html:
        h2(
          "5.1 Offer Amounts and Payment Obligations.",
          "The Merchant shall be obligated to pay the Offer Amount for each Qualifying Transaction. The Offer Amount shall be determined by Carrot in its sole discretion and shall include both the Reward Amount paid or credited to the consumer and any platform fees, partner fees, acquisition costs, or other fees retained by Carrot or its partners.",
          "The Merchant acknowledges and agrees that it is financially responsible for the full Offer Amount for every Qualifying Transaction attributed to its Location, regardless of whether the offer was activated within the Carrot App or through any third-party partner within the Carrot Network.",
          "The Merchant is not entitled to, and Carrot has no obligation to disclose, the portion of any Offer Amount that is paid or credited to the consumer as the Reward Amount, the portion retained by Carrot or its partners, Carrot’s margins, acquisition costs, or any other internal allocation or economics of an offer. The Reward Amount and any amounts retained by Carrot may vary by consumer, channel, and over time, and may be presented to the consumer as a predetermined amount after fees have been applied. The Merchant shall not request, demand, or condition payment on the disclosure of such information.",
          "All payments are non-refundable except in cases where Carrot, in its sole discretion, determines that a transaction was erroneously attributed to the Merchant, in which case Carrot may issue a statement credit.",
        ) +
        h2(
          "5.2 Reconciliation.",
          "Carrot shall provide the Merchant with access to transaction details and Weekly Statements through the Merchant Dashboard. The Merchant is responsible for reviewing such information and reconciling Qualifying Transactions against its own records in a timely manner. The Merchant’s failure to review, reconcile, or object to any Weekly Statement or Qualifying Transaction within a reasonable time shall not relieve the Merchant of its obligation to pay the applicable Offer Amount. All payments shall remain due and payable in accordance with this Agreement regardless of whether the Merchant has completed its reconciliation process.",
        ) +
        h2(
          "5.3 Payment Methods, Authorization, and Processing Fees.",
          "The Merchant authorizes Carrot to charge any Payment Method on file or otherwise associated with the Merchant’s account for all amounts due under this Agreement. Carrot may first attempt to charge the Merchant’s default or primary Payment Method. If such charge is declined or unsuccessful after reasonable retry attempts, Carrot may, in its sole discretion, attempt to charge any other Payment Methods on file or associated with the Merchant’s account.",
          "ACH is Carrot’s preferred payment method and is provided at no additional cost to the Merchant. If the Merchant elects to pay by credit or debit card, the Merchant shall be responsible for all applicable credit card processing fees charged by Carrot’s payment processor. These fees will be added to the amount charged and will be clearly disclosed in the Merchant Dashboard. The Merchant authorizes Carrot to charge these processing fees in addition to the Offer Reimbursements owed.",
        ) +
        h2(
          "5.4 Failure to Provide or Maintain a Valid Payment Method.",
          "Providing and maintaining a valid Payment Method on file is a material obligation of the Merchant under this Agreement. If the Merchant fails to provide at least one valid Payment Method within seven (7) days after the Effective Date of this Agreement, or if all Payment Methods on file subsequently become invalid or are declined and the Merchant fails to provide a replacement valid Payment Method within seven (7) days after written notice from Carrot, then Carrot may, in its sole discretion:",
        ) +
        "<p>(a) immediately suspend the Merchant’s campaign, offers, and participation in the Carrot platform until a valid Payment Method is provided; and/or</p>" +
        "<p>(b) terminate this Agreement for cause pursuant to Section 7 and assess the Early Termination Fee, together with any accrued but unpaid Offer Reimbursements, Dispute Fees, and other amounts owed by the Merchant.</p>" +
        p(
          "The Merchant acknowledges that repeated failure to maintain a valid Payment Method, or refusal to provide one after notice, may constitute a Bad Faith Breach under Section 10, entitling Carrot to assess Accelerated Damages.",
        ) +
        h2(
          "5.5 Weekly Billing and Payment.",
          "Carrot shall issue a Weekly Statement detailing all Qualifying Transactions and the total Offer Reimbursements owed. Payment is due immediately upon issuance of each Weekly Statement. ACH is Carrot’s preferred payment method. The Merchant may elect to pay by credit or debit card, in which case the Merchant shall be responsible for all applicable credit card processing fees charged by Carrot’s payment processor. These fees will be clearly disclosed in the Merchant Dashboard. The Merchant authorizes Carrot to charge the Payment Method on file for all amounts due and agrees to maintain a valid Payment Method at all times. If any charge is declined, Carrot will make reasonable attempts to process payment. Failure to maintain a valid Payment Method or pay amounts due may result in suspension of the Merchant’s campaign. The Merchant remains liable for all Offer Reimbursements incurred regardless of payment method.",
        ) +
        h2(
          "5.6 Late Fees.",
          "Any amounts not paid when due shall accrue interest at the rate of 1.5% per month (18% per annum), or the maximum rate permitted by law, whichever is less. The Merchant shall also be responsible for all costs of collection, including reasonable attorneys’ fees and collection agency fees.",
        ) +
        h2(
          "5.7 Taxes.",
          "The Merchant is responsible for the payment of all applicable taxes, duties, or charges. The Offer Amount and reimbursement calculations are based on the full transaction amount, including tax and tip. Carrot has no visibility into individual items purchased or how a tab is split, and the Merchant shall remain responsible for all taxes due on the full sale.",
        ),
    },
    {
      id: "term-and-renewal",
      title: "6. Term and Renewal",
      html: p(
        "The initial Term of this Agreement shall be twelve (12) months from the Effective Date. Thereafter, the Agreement shall automatically renew for successive twelve (12) month periods unless the Merchant provides written notice of its intent not to renew at least thirty (30) days prior to the expiration of the then-current Term.",
      ),
    },
    {
      id: "termination",
      title: "7. Termination and Early Termination Fee",
      html:
        h2(
          "7.1 Early Termination Fee.",
          "In the event the Merchant terminates this Agreement prior to the end of the then-current Term for any reason other than Carrot’s uncured material breach, Carrot may, in its sole discretion, charge the Merchant an Early Termination Fee equal to the Monthly Commitment Amount multiplied by the number of months remaining in the then-current Term.",
        ) +
        h2(
          "7.2 Confirmation of Termination Notice.",
          "All termination notices must be provided in accordance with Section 22.2 (Notices). A termination notice shall be effective only upon Carrot’s actual receipt of such notice. It is the Merchant’s sole responsibility to confirm that Carrot has received the termination notice. If the Merchant does not receive written confirmation from Carrot within a reasonable period after sending a termination notice, the Merchant must follow up with Carrot to verify receipt. Until Carrot provides written confirmation of receipt of a valid termination notice, the Merchant remains fully responsible for all obligations under this Agreement, including all Offer Reimbursements for Qualifying Transactions and any applicable Early Termination Fee.",
        ) +
        h2(
          "7.3 Winddown Discussion.",
          "Upon receipt of notice of early termination from the Merchant, Carrot may, in its sole discretion, request a discussion with the Merchant prior to finalizing termination. The purpose of such discussion may include understanding the Merchant’s experience with the program, addressing any concerns, and exploring potential solutions. Participation in any such discussion shall be voluntary and shall not delay, suspend, or otherwise affect the Merchant’s termination obligations or Carrot’s rights under this Agreement, including Carrot’s right to assess an Early Termination Fee.",
        ),
    },
    {
      id: "effect-of-termination",
      title: "8. Effect of Termination",
      html: p(
        "Upon any termination or expiration of this Agreement for any reason, the Merchant shall remain fully responsible for all Qualifying Transactions that occurred on or prior to the termination or expiration date, regardless of when such transactions are reported or billed to the Merchant. The Merchant acknowledges and agrees that due to data reporting lags and reconciliation requirements from network partners, Qualifying Transactions may be reported up to ninety (90) days after the termination date. The Merchant shall pay all such post-termination invoices in full.",
      ),
    },
    {
      id: "ramp-down-period",
      title: "9. Ramp-Down Period",
      html: p(
        "Upon Termination or Suspension of the Campaign, the Merchant acknowledges and agrees that although Carrot has ceased the campaign, Redemptions can still occur due to certain Cardholders who may have previously activated the reward before the campaign was ended, and by law, the Merchant is financially responsible for all redemptions that occur during this “Ramp-Down Period”. Once all activated offers are either redeemed or “timed-out”, the Merchant will cease to be responsible for any further redemptions. The standard “Ramp-Down Period” is 30 days from the Termination or Suspension Date (for previously activated offers only; no new offers will be activated and redeemed).",
      ),
    },
    {
      id: "bad-faith-breach",
      title: "10. Bad Faith Breach and Accelerated Damages",
      html:
        h2(
          "10.1 Bad Faith Breach and Accelerated Damages.",
          "The Merchant acknowledges that its payment obligations under this Agreement are material. In the event the Merchant commits a Bad Faith Breach, Carrot shall be entitled to assess Accelerated Damages against the Merchant. Accelerated Damages shall consist of (i) all unpaid Offer Reimbursements, (ii) the Early Termination Fee for the remainder of the then-current Term, (iii) any Dispute Fees, collection costs, and reasonable attorneys’ fees incurred by Carrot, and (iv) liquidated damages in the amount of Seven Thousand Five Hundred Dollars ($7,500). The Merchant agrees that this liquidated damages amount is a reasonable estimate of the damages Carrot would suffer as a result of such Bad Faith Breach and is not a penalty.",
        ) +
        h2(
          "10.2 Erroneous Disputes and Chargebacks.",
          "If the Merchant disputes, initiates a chargeback, or otherwise seeks to reverse any charge made by Carrot that was validly due under this Agreement, the Merchant shall remain fully responsible for the original amount charged, plus any Dispute Fees imposed on Carrot by its payment processor, bank, or financial institution, plus any other reasonable costs incurred by Carrot as a result of such dispute. Erroneous, repeated, or bad faith disputes by the Merchant may constitute a Bad Faith Breach under this Agreement and may result in the assessment of Accelerated Damages.",
        ),
    },
    {
      id: "data-use-and-license",
      title: "11. Data Use and License",
      html: p(
        "The Merchant grants Carrot a perpetual, royalty-free license to access, collect, use, analyze, and process all transaction data related to Qualifying Transactions. Carrot may use this data to operate the program, provide performance insights, create aggregate or anonymized data, and for marketing or case studies.",
      ),
    },
    {
      id: "intellectual-property",
      title: "12. Intellectual Property and License",
      html: p(
        "The Merchant grants Carrot and its partners a non-exclusive, royalty-free, worldwide, irrevocable license to use, reproduce, display, and distribute the Merchant Materials in connection with operating the Carrot Network, promoting the Merchant’s business, and fulfilling Carrot’s obligations under this Agreement. This license includes the right to use any publicly available information about the Merchant, including business name, location, photographs, and descriptions obtained from third-party sources. The Merchant represents and warrants that it has all necessary rights to grant the above license and waives any claims against Carrot relating to Carrot’s use of publicly available Merchant Materials.",
      ),
    },
    {
      id: "marketing-and-promotional-rights",
      title: "13. Marketing and Promotional Rights",
      html: p(
        "The Merchant grants Carrot a non-exclusive, royalty-free license to use the Merchant’s name, logo, trademarks, and service marks to promote the Merchant’s business and offers. This includes the right to publicly state that the Merchant is a customer of Carrot, to feature the Merchant in marketing materials, case studies, and to promote the Merchant’s offers across any channels, including social media.",
      ),
    },
    {
      id: "representations-and-warranties",
      title: "14. Merchant Representations and Warranties",
      html: p(
        "The Merchant represents and warrants to Carrot that: (a) it has the full right, power, and authority to enter into this Agreement and perform its obligations hereunder; (b) the individual accepting this Agreement is duly authorized to bind the Merchant to these Terms; (c) its execution and performance of this Agreement will not violate any other agreement to which it is a party; and (d) all information provided to Carrot is true, accurate, and complete in all material respects. Any breach of these representations shall constitute a Bad Faith Breach under this Agreement.",
      ),
    },
    {
      id: "limitation-of-liability",
      title: "15. Limitation of Liability",
      html: p(
        "IN NO EVENT SHALL CARROT BE LIABLE TO THE MERCHANT FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS OR LOSS OF BUSINESS, EVEN IF CARROT HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. CARROT’S TOTAL LIABILITY TO THE MERCHANT SHALL NOT EXCEED THE TOTAL AMOUNTS PAID BY THE MERCHANT TO CARROT IN THE THREE (3) MONTHS PRECEDING THE CLAIM.",
      ),
    },
    {
      id: "indemnification",
      title: "16. Indemnification",
      html: p(
        "The Merchant agrees to indemnify, defend, and hold harmless Carrot, its officers, directors, employees, and partners from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to: (i) the Merchant’s breach of this Agreement, (ii) any dispute between the Merchant and its customers, or (iii) the Merchant’s business operations.",
      ),
    },
    {
      id: "customer-communications",
      title: "17. Customer Communications",
      html: p(
        "The Merchant acknowledges and agrees that Carrot and its network partners shall have the sole and exclusive right to communicate with consumers regarding any Carrot Offer, including the terms, redemption process, and customer support. The Merchant shall not contact any consumer about a Carrot Offer, redemption, or related cashback for any reason. The Merchant further agrees not to disparage Carrot or the program to any third party.",
      ),
    },
    {
      id: "statement-credits",
      title: "18. Statement Credits",
      html: p(
        "The Merchant acknowledges that cashback rewards may be fulfilled as a statement credit, points, gift card, in-store credit, or any other form of value. Regardless of how the reward is delivered to the consumer, the Merchant remains fully responsible for paying Carrot the full Offer Amount for each Qualifying Transaction.",
      ),
    },
    {
      id: "merchant-dashboard",
      title: "19. Merchant Dashboard",
      html: p(
        "Carrot will provide the Merchant with access to a Merchant Dashboard where it can view transaction details, Weekly Statements, and manage users. The Merchant may add additional users to the Dashboard as needed. The Merchant Dashboard is provided for reconciliation purposes only and does not include disclosure of Reward Amounts, platform fees, margins, or any other internal offer economics.",
      ),
    },
    {
      id: "no-volume-guarantee",
      title: "20. No Volume Guarantee",
      html: p(
        "Carrot makes no guarantee regarding the number or volume of customers or Qualifying Transactions the Merchant will receive. The program is performance-based. While Carrot will use reasonable efforts to honor the Merchant’s stated customer limits, the Merchant acknowledges that due to reporting delays, slight overages may occur. The Merchant agrees to honor and pay for all Qualifying Transactions, including reasonable overages.",
      ),
    },
    {
      id: "governing-law",
      title: "21. Governing Law & Dispute Resolution",
      html:
        h2(
          "21.1 Negotiation.",
          "In the event of any dispute, controversy, or claim arising out of or relating to this Agreement or the breach thereof, the parties shall first attempt in good faith to resolve the dispute through informal discussions. Either party may initiate such discussions by providing written notice to the other party describing the nature of the dispute. The parties shall have thirty (30) days from the date of such notice to attempt to resolve the dispute amicably.",
        ) +
        h2(
          "21.2 Collections.",
          "If the dispute remains unresolved after the thirty (30) day negotiation period, Carrot may, in its sole discretion, refer the matter to a third-party collections agency. The Merchant shall be responsible for all collection fees, costs, and expenses incurred by Carrot in connection with such referral.",
        ) +
        h2(
          "21.3 Binding Arbitration.",
          "If the dispute remains unresolved following the collections process, the dispute shall be resolved by binding arbitration administered by the American Arbitration Association (“AAA”) in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted by a single arbitrator. The place of arbitration shall be Spokane County, Washington. The arbitration shall be conducted in English. Judgment upon the award rendered by the arbitrator may be entered in any court having jurisdiction.",
        ) +
        h2(
          "21.4 Costs and Fees.",
          "The Merchant shall be solely responsible for all costs and expenses of the arbitration, including without limitation the arbitrator’s fees, administrative fees, and reasonable attorneys’ fees and costs incurred by Carrot in connection with the arbitration, regardless of the outcome of the arbitration.",
        ) +
        h2(
          "21.5 Class Action Waiver.",
          "The Merchant agrees that any dispute arising under this Agreement shall be resolved on an individual basis only. The Merchant hereby waives any right to participate in any class action, collective action, representative action, or any other proceeding in which any party acts or proposes to act in a representative capacity. The Merchant further agrees that no arbitration or proceeding under this Agreement shall be joined, consolidated, or combined with any other arbitration or proceeding.",
        ) +
        h2(
          "21.6 Governing Law.",
          "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.",
        ),
    },
    {
      id: "general-provisions",
      title: "22. General Provisions",
      html:
        h2(
          "22.1 No Partnership.",
          "Nothing in this Agreement creates any partnership, joint venture, employment, or agency relationship between the parties. The Merchant and Carrot are independent contractors.",
        ) +
        h2(
          "22.2 Notices.",
          "Any notices or other communications required or permitted to be given or delivered under this Agreement shall be in writing and shall be sufficiently given if (i) emailed or delivered personally, (ii) mailed by certified or registered mail return receipt requested, postage prepaid, or (iii) sent by overnight guaranteed delivery service, and addressed to the party’s proper address as set forth on the cover page or to such other address or addressee as either party may from time to time designate to the other by written notice.",
          "Notices sent by email shall be deemed delivered upon transmission, unless the sending party receives a delivery failure notification or bounce-back message. For termination notices specifically, the party sending the termination notice bears the sole responsibility of confirming that the other party has actually received the notice. Any such notice or other communication shall be deemed to be given as of the date it is delivered to the recipient.",
        ) +
        h2(
          "22.3 Entire Agreement.",
          "These Terms, together with the Enrollment Agreement, constitute the entire agreement between the parties.",
        ) +
        h2(
          "22.4 Conflicting Terms.",
          "In the event of any conflict or inconsistency between the Enrollment Agreement and these Terms, these Terms shall control and prevail.",
        ) +
        h2(
          "22.5 Modification.",
          "Carrot may update or modify these Terms from time to time in its sole discretion. Carrot will provide notice of any material changes to these Terms by email to the address associated with the Merchant’s account or by posting a notice in the Merchant Dashboard. The Merchant’s continued participation in the Carrot platform or continued use of the services after such notice shall constitute acceptance of the updated Terms. If the Merchant does not agree to any material changes, they may terminate this Agreement in accordance with Section 7 (Termination and Early Termination Fee).",
        ) +
        h2(
          "22.6 Assignment.",
          "The Merchant may not assign this Agreement without Carrot’s prior written consent. Carrot may assign, transfer, sell, or novate this Agreement, in whole or in part, to any Affiliate, successor entity, or third party (including in connection with a sale, merger, acquisition, or rebranding of Carrot), without the Merchant’s consent and without notice to the Merchant.",
        ) +
        h2(
          "22.7 Severability.",
          "If any provision is held invalid, the remainder shall continue in full force and effect.",
        ) +
        h2(
          "22.8 Waiver.",
          "No waiver of any breach shall constitute a waiver of any other breach.",
        ) +
        h2(
          "22.9 Counterparts and Electronic Signatures.",
          "This Agreement may be executed in counterparts, each of which shall be deemed an original. This Agreement may also be executed by electronic signature, which shall be considered an original signature for all purposes and shall have the same legal effect as a handwritten signature. The Merchant agrees that its electronic acceptance of the Enrollment Agreement shall be legally binding.",
        ) +
        h2(
          "22.10 Headings.",
          "The section headings contained in this Agreement are for reference purposes only and shall not affect the meaning or interpretation of this Agreement.",
        ) +
        h2(
          "22.11 No Third-Party Beneficiaries.",
          "This Agreement is made for the benefit of the parties hereto only. No third party shall have any rights or claims under this Agreement.",
        ) +
        h2(
          "22.12 Force Majeure.",
          "Neither party shall be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, pandemics, government actions, power failures, internet or telecommunications disruptions, or shortages of transportation, facilities, fuel, energy, labor, or materials. The affected party shall give prompt written notice to the other party and shall use reasonable efforts to mitigate the effects of the force majeure event. If the force majeure event continues for more than ninety (90) days, either party may terminate this Agreement upon written notice to the other party without liability for such termination.",
        ) +
        h2(
          "22.13 Corporate Changes.",
          "This Agreement shall remain in full force and effect and shall be binding upon the Merchant regardless of any change in Carrot’s name, state of incorporation, corporate form, or structure, including but not limited to any reincorporation, conversion, merger, or reorganization in which Carrot is the surviving or resulting entity. The Merchant agrees that any such change shall not affect Carrot’s rights or obligations under this Agreement, and the Merchant shall continue to perform its obligations hereunder without any additional consent or notice.",
        ) +
        h2(
          "22.14 Identification of the Merchant and Location.",
          "This Agreement is entered into with respect to the business operating at the Location identified in the Enrollment Agreement. The Merchant agrees that this Agreement shall be binding upon the business operating at such Location regardless of any discrepancy between (i) the name used in the Enrollment Agreement, on Google Maps, in any marketing materials, or otherwise used to identify the business, and (ii) the Merchant’s legal entity name, DBA, or trade name. The Merchant waives any defense or claim based on a difference between the name used to identify the business and its legal entity name.",
        ),
    },
    {
      id: "survival",
      title: "23. Survival",
      html: p(
        "The following provisions of this Agreement shall survive the termination or expiration of this Agreement for any reason: Section 5 (Billing and Payment Terms); Section 10 (Bad Faith Breach and Accelerated Damages); Section 11 (Data Use and License); Section 12 (Intellectual Property and License); Section 13 (Marketing and Promotional Rights); Section 15 (Limitation of Liability); Section 16 (Indemnification); Section 17 (Customer Communications); Section 18 (Statement Credits); Section 21 (Dispute Resolution); and Section 22 (General Provisions). In addition, any other provisions of this Agreement that by their nature should reasonably survive termination or expiration shall also survive.",
      ),
    },
  ],
};
