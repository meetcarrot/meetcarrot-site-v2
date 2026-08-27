export interface LegalSection {
  id: string;
  title: string;
  /** Trusted CMS HTML. */
  html: string;
}

export interface LegalDoc {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

const SUPPORT_EMAIL_LINK =
  '<a class="external-link" href="mailto:support@meetcarrot.xyz" rel="nofollow">support@meetcarrot.xyz</a>';

export const TERMS: LegalDoc = {
  title: "Terms of use",
  lastUpdated: "August 13, 2026",
  intro:
    "<p>These Website Terms of Service (“Terms”) govern your access to and use of the website operated by Carrot Company Limited, USA, a Delaware corporation (“Carrot,” “we,” “us,” or “our”).</p>",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      html:
        "<p>By accessing or using this website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the website.</p>",
    },
    {
      id: "use-of-website",
      title: "2. Use of the Website",
      html:
        "<p>This website is provided for informational purposes and to allow the purchase of certain products. You may browse the site to learn about Carrot, inquire about our services, or purchase a Pass. You agree to use the website only for lawful purposes and in accordance with these Terms.</p><p>You may not attempt to gain unauthorized access to any part of the website, interfere with its operation, or use it in any way that could harm Carrot or other users.</p>",
    },
    {
      id: "merchant-dashboard",
      title: "3. Merchant Dashboard",
      html:
        "<p>If you are an enrolled merchant, you may access a secure dashboard on this website to view performance data and manage certain account settings, including payment methods.</p><p>Access to the Merchant Dashboard is limited to authorized users. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.</p>",
    },
    {
      id: "pass-purchases",
      title: "4. Pass Purchases",
      html:
        "<p>Carrot may offer consumer membership products (“Passes”) for purchase on this website. When you purchase a Pass:</p><ul><li><p>Payment is processed securely through Stripe.</p></li><li><p>Pass purchases are non-refundable, except where Carrot decides in its sole discretion to issue a refund.</p></li><li><p>A Pass provides access to certain boosted cashback offer collections for a limited period of time.</p></li><li><p>To access and use a Pass, you must download the Carrot mobile app and agree to the separate App Terms of Service and App Privacy Policy. Those App Terms govern your use of the Pass.</p></li></ul><p>These Website Terms only cover the purchase of a Pass on the website. All other terms related to the Pass are governed by the App Terms.</p>",
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      html:
        "<p>All content on this website, including text, graphics, logos, and design, is owned by Carrot or its licensors and is protected by intellectual property laws. You may not copy, modify, distribute, or use any content from this website without our prior written permission.</p>",
    },
    {
      id: "disclaimers",
      title: "6. Disclaimers & Limitation of Liability",
      html:
        "<p>This website is provided on an “as is” and “as available” basis. Carrot makes no warranties, express or implied, regarding the website, including but not limited to accuracy, reliability, or availability.</p><p>To the fullest extent permitted by law, Carrot shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your use of the website.</p>",
    },
    {
      id: "privacy",
      title: "7. Privacy",
      html:
        '<p>Your use of the website is also governed by our <a class="external-link" href="/privacy">Privacy Policy</a>. Please review it to understand how we collect, use, and protect information.</p>',
    },
    {
      id: "electronic-communications",
      title: "8. Electronic Communications",
      html:
        "<p>By using this website or contacting us, you consent to receive electronic communications from Carrot. You agree that all agreements, notices, and other communications we provide electronically satisfy any legal requirement that such communications be in writing.</p>",
    },
    {
      id: "other-agreements",
      title: "9. Other Agreements",
      html:
        "<p>These Website Terms apply only to your use of this website.</p><p>If you enroll as a merchant with Carrot, you will be required to agree to separate Merchant Terms during the enrollment process. Those Merchant Terms (including any arbitration or dispute resolution provisions) will govern your relationship with Carrot as a merchant.</p><p>If you create a consumer account or use the Carrot mobile app, you will be required to agree to separate App Terms of Service and a Privacy Policy. Those terms will govern your use of the app, including any Pass you have purchased.</p><p>In the event of any conflict between these Website Terms and the Merchant Terms or App Terms, the Merchant Terms or App Terms will control with respect to those services.</p>",
    },
    {
      id: "governing-law",
      title: "10. Governing Law",
      html:
        "<p>These Terms are governed by the laws of the State of Delaware, without regard to its conflict of laws principles.</p>",
    },
    {
      id: "changes",
      title: "11. Changes to These Terms",
      html:
        "<p>We may update these Terms from time to time. When we do, we will revise the “Last Updated” date at the top of this page. Your continued use of the website after any changes constitutes acceptance of the updated Terms.</p>",
    },
    {
      id: "contact",
      title: "12. Contact Us",
      html: `<p>If you have any questions about these Terms, please contact us at:</p><p><strong>${SUPPORT_EMAIL_LINK}</strong></p>`,
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: "Privacy policy",
  lastUpdated: "August 13, 2026",
  intro:
    "<p>This Privacy Policy describes how Carrot Company Limited, USA, a Delaware corporation (“Carrot,” “we,” “us,” or “our”) collects, uses, and shares information when you use our website.</p><p>This Privacy Policy applies only to our website. The Carrot mobile app is governed by a separate Privacy Policy.</p><p>By using our website, you agree to the practices described in this Privacy Policy.</p>",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      html:
        "<p>Carrot operates a website that provides information about our services, allows the purchase of Passes, and allows enrolled merchants to access a secure dashboard. This Privacy Policy explains how we handle personal information in connection with the website only.</p><p>The Carrot cashback service and mobile app are governed by separate agreements. Merchants are subject to the Merchant Terms upon enrollment, and consumers are subject to the App Terms and App Privacy Policy when they use the mobile app.</p>",
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      html:
        "<p>We may collect the following types of information:</p><ul><li><p><strong>Information you provide to us:</strong> Such as your name, email address, phone number, business name, and any other information you submit through contact or inquiry forms.</p></li><li><p><strong>Payment information:</strong> When you purchase a Pass, payment details are processed by our payment processor (Stripe). We do not store full payment card information on our systems.</p></li><li><p><strong>Account information:</strong> If you are an enrolled merchant, we collect information related to your dashboard account, including login credentials and account activity.</p></li><li><p><strong>Automatically collected information:</strong> When you visit the website, we may automatically collect certain technical information, such as your IP address, browser type, device information, pages visited, and general usage data.</p></li></ul>",
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Information",
      html:
        "<p>We use the information we collect to:</p><ul><li><p>Operate and improve the website</p></li><li><p>Respond to inquiries and provide customer support</p></li><li><p>Process Pass purchases and related transactions</p></li><li><p>Allow enrolled merchants to access and manage their dashboard</p></li><li><p>Communicate with you about our services</p></li><li><p>Monitor usage and ensure the security of the website</p></li><li><p>Comply with legal obligations</p></li></ul>",
    },
    {
      id: "how-we-share-information",
      title: "4. How We Share Information",
      html:
        "<p>We do not sell your personal information.</p><p>We may share information in the following circumstances:</p><ul><li><p><strong>Service providers:</strong> With third-party vendors who help us operate the website and provide services (such as hosting, analytics, payment processing, or customer support), under appropriate confidentiality obligations.</p></li><li><p><strong>Legal requirements:</strong> When required by law, legal process, or to protect the rights, property, or safety of Carrot, our users, or others.</p></li><li><p><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, in which case personal information may be transferred as part of that transaction.</p></li></ul>",
    },
    {
      id: "cookies",
      title: "5. Cookies and Tracking Technologies",
      html:
        "<p>We may use cookies and similar technologies to operate the website, understand how it is used, and improve performance. You can control cookies through your browser settings. Note that disabling cookies may affect certain features of the website.</p>",
    },
    {
      id: "merchant-dashboard",
      title: "6. Merchant Dashboard",
      html:
        "<p>If you are an enrolled merchant, you may log into a secure dashboard on our website to view performance data and manage account settings. Information associated with your merchant account is used to provide and support these dashboard features.</p><p>You are responsible for maintaining the confidentiality of your login credentials.</p>",
    },
    {
      id: "data-security",
      title: "7. Data Security",
      html:
        "<p>We take reasonable administrative, technical, and physical measures to protect personal information from unauthorized access, loss, misuse, or alteration. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>",
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      html:
        "<p>We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required by law.</p>",
    },
    {
      id: "your-choices",
      title: "9. Your Choices",
      html:
        "<p>You may contact us to:</p><ul><li><p>Update or correct information you have provided</p></li><li><p>Request access to personal information we hold about you</p></li><li><p>Opt out of non-essential communications</p></li></ul><p>Merchants may also manage certain account information directly through the dashboard.</p>",
    },
    {
      id: "state-privacy-rights",
      title: "10. State Privacy Rights",
      html: `<p>Residents of certain states, including California, may have additional rights regarding their personal information, such as the right to request access to or deletion of their information. To make a request, contact us at ${SUPPORT_EMAIL_LINK}.</p>`,
    },
    {
      id: "childrens-privacy",
      title: "11. Children’s Privacy",
      html:
        "<p>Our website is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>",
    },
    {
      id: "changes",
      title: "12. Changes to This Privacy Policy",
      html:
        "<p>We may update this Privacy Policy from time to time. When we do, we will revise the “Last Updated” date at the top of this page. Your continued use of the website after any changes constitutes acceptance of the updated policy.</p>",
    },
    {
      id: "contact",
      title: "13. Contact Us",
      html: `<p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p><p><strong>${SUPPORT_EMAIL_LINK}</strong></p>`,
    },
  ],
};
