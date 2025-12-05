import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";
import Footer from "../Components/Footer";
import MainNavbar from "../NavBar/MainNavbar";

// --- Animation Variants (Reused for consistency) ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// --- Data Structure ---
const pricingTiers = [
  {
    name: "Starter",
    description: "The essential foundation for small, agile teams.",
    monthly: 12,
    annual: 10,
    features: [
      "5 User Seats",
      "Real-Time Chat",
      "2GB Cloud Storage",
      "Basic Analytics",
      "Standard Support",
    ],
    isPopular: false,
  },
  {
    name: "Pro",
    description:
      "Scale your coordination and unlock advanced syncing features.",
    monthly: 39,
    annual: 32,
    features: [
      "Unlimited User Seats",
      "Advanced Collaboration Tools",
      "100GB Cloud Storage",
      "Granular Permissions",
      "Dedicated Account Manager",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    description:
      "Custom solutions for global organizations with complex needs.",
    monthly: "Custom",
    annual: "Custom",
    features: [
      "Dedicated Sync Engine",
      "Custom Integrations",
      "Unlimited Storage",
      "SLA Guarantee",
      "24/7 Priority Support",
    ],
    isPopular: false,
  },
];

// --- Sub-Components ---

const BillingToggle = ({ billingCycle, setBillingCycle }) => (
  <motion.div
    className="inline-flex p-1 bg-gray-100 rounded-full shadow-inner"
    variants={itemVariants}
  >
    <button
      onClick={() => setBillingCycle("monthly")}
      className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-300 ${
        billingCycle === "monthly"
          ? "bg-white text-purple-600 shadow-md"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      Monthly Billing
    </button>
    <button
      onClick={() => setBillingCycle("annual")}
      className={`py-2 px-6 rounded-full text-sm font-semibold transition-colors duration-300 relative ${
        billingCycle === "annual"
          ? "bg-white text-purple-600 shadow-md"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      Annual Billing
      <span className="absolute -top-3 right-0 bg-pink-500 text-white text-xs font-bold py-0.5 px-2 rounded-full transform rotate-3">
        -18%
      </span>
    </button>
  </motion.div>
);

const PricingCard = ({ tier, billingCycle, delay }) => {
  const isCustom = tier.monthly === "Custom";
  const price = isCustom
    ? tier.monthly
    : billingCycle === "monthly"
    ? tier.monthly
    : tier.annual;
  const timeUnit = isCustom ? "" : `/user/month`;

  return (
    <motion.div
      className={`p-8 rounded-3xl shadow-2xl flex flex-col h-full transition-all duration-300 ${
        tier.isPopular
          ? "bg-purple-700 text-white scale-105 border-4 border-pink-500"
          : "bg-white text-gray-900 border border-gray-200 hover:shadow-purple-300/50"
      }`}
      variants={itemVariants}
      transition={{ delay }}
      whileHover={{ scale: tier.isPopular ? 1.05 : 1.03 }}
    >
      {tier.isPopular && (
        <div className="text-center text-sm font-bold bg-pink-500 rounded-full py-1 mb-4">
          Most Popular
        </div>
      )}

      <h3 className="text-3xl font-extrabold mb-2">{tier.name}</h3>
      <p
        className={`mb-6 ${
          tier.isPopular ? "text-purple-200" : "text-gray-500"
        }`}
      >
        {tier.description}
      </p>

      <div className="my-6">
        {isCustom ? (
          <p className="text-5xl font-extrabold">{price}</p>
        ) : (
          <p className="text-6xl font-extrabold leading-none">
            ${price}
            <span
              className={`text-xl font-medium ml-1 ${
                tier.isPopular ? "text-purple-200" : "text-gray-500"
              }`}
            >
              {timeUnit}
            </span>
          </p>
        )}

        {billingCycle === "annual" && !isCustom && (
          <p
            className={`mt-2 text-sm ${
              tier.isPopular ? "text-purple-300" : "text-gray-500"
            }`}
          >
            Billed annually at ${tier.annual * 12}
          </p>
        )}
      </div>

      <button
        className={`w-full py-3 rounded-full text-lg font-bold flex items-center justify-center transition-colors duration-300 ${
          tier.isPopular
            ? "bg-pink-500 text-white hover:bg-pink-600 shadow-lg shadow-pink-500/50"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {isCustom ? "Contact Sales" : "Get Started"}
        <ArrowRight className="ml-2 w-5 h-5" />
      </button>

      <div
        className={`mt-8 pt-6 border-t ${
          tier.isPopular ? "border-purple-500" : "border-gray-200"
        }`}
      >
        <h4 className="font-bold mb-3">Key Features:</h4>
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check
                className={`w-4 h-4 mr-2 ${
                  tier.isPopular ? "text-pink-300" : "text-purple-500"
                }`}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Subcription = () => {
  const [billingCycle, setBillingCycle] = React.useState("monthly"); // 'monthly' or 'annual'

  return (
    <>
      <div className="relative w-full md:px-10 px-5 py-5 md:py-8">
        <MainNavbar />
      </div>
      <motion.div
        className="min-h-screen bg-white p-4 md:p-12 font-inter text-gray-900 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- HERO SECTION & TOGGLE --- */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.p
            className="text-lg text-purple-600 font-medium mb-4 uppercase tracking-wider"
            variants={itemVariants}
          >
            Simple, Transparent Pricing
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter mb-8"
            variants={itemVariants}
          >
            <span className="block">Find the perfect plan for</span>
            <span className="text-purple-600">Your Team's Sync.</span>
          </motion.h1>

          <BillingToggle
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
        </div>

        {/* --- PRICING CARDS --- */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-center">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              billingCycle={billingCycle}
              delay={0.6 + index * 0.2}
            />
          ))}
        </div>

        {/* --- FEATURE COMPARISON SECTION --- */}
        <motion.div
          className="max-w-4xl mx-auto pt-10 border-t border-gray-200"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-extrabold text-center mb-10"
            variants={itemVariants}
          >
            Detailed Plan Comparison
          </motion.h2>

          {/* Comparison Table (Simple Layout) */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            variants={itemVariants}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Starter
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Pro
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <FeatureRow
                  feature="Unlimited Guest Access"
                  starter={false}
                  pro={true}
                  enterprise={true}
                />
                <FeatureRow
                  feature="Advanced Security (SSO/2FA)"
                  starter={false}
                  pro={true}
                  enterprise={true}
                />
                <FeatureRow
                  feature="API Access"
                  starter={false}
                  pro={true}
                  enterprise={true}
                />
                <FeatureRow
                  feature="Dedicated Training & Onboarding"
                  starter={false}
                  pro={false}
                  enterprise={true}
                />
                <FeatureRow
                  feature="Audit Logs & Data Export"
                  starter={false}
                  pro={false}
                  enterprise={true}
                />
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

// Reusable table row component
const FeatureRow = ({ feature, starter, pro, enterprise }) => {
  const Checkmark = ({ isAvailable }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
      {isAvailable ? (
        <Check className="w-5 h-5 text-purple-600 mx-auto" />
      ) : (
        <X className="w-4 h-4 text-gray-300 mx-auto" />
      )}
    </td>
  );

  return (
    <motion.tr
      className="hover:bg-gray-50 transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 text-sm font-medium text-gray-800">{feature}</td>
      <Checkmark isAvailable={starter} />
      <Checkmark isAvailable={pro} />
      <Checkmark isAvailable={enterprise} />
    </motion.tr>
  );
};

export default Subcription;
