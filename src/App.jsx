import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Truck, Package, Wrench, Bus, Wallet, History, User, ChevronLeft, ChevronRight,
  Phone, MessageCircle, MapPin, Clock, AlertCircle, CheckCircle2, X, Plus,
  Sun, Moon, Globe, Palette, Volume2, VolumeX, Search, Filter, Bell,
  CreditCard, Banknote, Building2, Star, TrendingUp, Users, Activity,
  ArrowRight, ArrowLeft, Settings, LogOut, Shield, Sparkles, Zap, Eye,
  ChevronDown, ChevronUp, Check, Loader2, Send, FileText, Layers, BarChart3,
  Calendar, Hash, AlertTriangle, Snowflake, Wifi, Mic, Briefcase, Home,
  GraduationCap, Car, Bike, Construction, ShieldCheck, Crown, Award,
  Navigation, ArrowUpRight, ArrowDownRight, RotateCcw, Download, MoreVertical,
  ChevronsRight, Building, Coffee, Cpu, Lock, Unlock, RefreshCw, Trash2,
  Receipt,
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Alias for Cash icon which doesn't exist in lucide-react
const Cash = Banknote;

// ===========================================================================
// THEMES & DEFAULT BRAND
// ===========================================================================
const THEMES = {
  light: {
    bg: "#FFFFFF",
    surface: "#FAFAFA",
    surfaceAlt: "#F4F4F5",
    surfaceMuted: "#FAFAFA",
    card: "#FFFFFF",
    text: "#09090B",
    textMuted: "#71717A",
    textSubtle: "#A1A1AA",
    border: "#E4E4E7",
    borderSoft: "#F4F4F5",
    borderStrong: "#D4D4D8",
    shadow: "rgba(9, 9, 11, 0.04)",
    shadowSm: "0 1px 2px rgba(9, 9, 11, 0.05)",
    shadowMd: "0 2px 8px rgba(9, 9, 11, 0.06), 0 1px 2px rgba(9, 9, 11, 0.04)",
    shadowLg: "0 12px 32px rgba(9, 9, 11, 0.10), 0 2px 6px rgba(9, 9, 11, 0.04)",
    shadowXl: "0 24px 48px rgba(9, 9, 11, 0.14), 0 4px 12px rgba(9, 9, 11, 0.06)",
    success: "#10B981", successBg: "#ECFDF5", successFg: "#047857",
    warning: "#F59E0B", warningBg: "#FFFBEB", warningFg: "#B45309",
    danger: "#EF4444", dangerBg: "#FEF2F2", dangerFg: "#B91C1C",
    info: "#3B82F6", infoBg: "#EFF6FF", infoFg: "#1D4ED8",
    overlay: "rgba(9, 9, 11, 0.45)",
  },
  dark: {
    bg: "#0A0A0B",
    surface: "#18181B",
    surfaceAlt: "#27272A",
    surfaceMuted: "#18181B",
    card: "#18181B",
    text: "#FAFAFA",
    textMuted: "#A1A1AA",
    textSubtle: "#71717A",
    border: "#27272A",
    borderSoft: "#1F1F23",
    borderStrong: "#3F3F46",
    shadow: "rgba(0, 0, 0, 0.5)",
    shadowSm: "0 1px 2px rgba(0, 0, 0, 0.3)",
    shadowMd: "0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)",
    shadowLg: "0 12px 32px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)",
    shadowXl: "0 24px 48px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)",
    success: "#10B981", successBg: "rgba(16, 185, 129, 0.12)", successFg: "#34D399",
    warning: "#F59E0B", warningBg: "rgba(245, 158, 11, 0.12)", warningFg: "#FBBF24",
    danger: "#EF4444", dangerBg: "rgba(239, 68, 68, 0.12)", dangerFg: "#F87171",
    info: "#3B82F6", infoBg: "rgba(59, 130, 246, 0.12)", infoFg: "#60A5FA",
    overlay: "rgba(0, 0, 0, 0.75)",
  },
};
const DEFAULT_BRAND = {
  name: "RELAYZ",
  tagline: "La route la plus courte",
  primary: "#FF6B35",
  primaryFg: "#FFFFFF",
  logoEmoji: "🚛",
};
// ===========================================================================
// i18n
// ===========================================================================
const I18N = {
  fr: {
    welcome: "Bienvenue", tagline_full: "La route la plus courte vers votre transport",
    iam_driver: "Je suis chauffeur", iam_client: "J'ai besoin d'un transport", admin_access: "Mode Admin",
    enter_phone: "Entre ton numéro pour continuer", phone_number: "Numéro de téléphone",
    send_code: "Envoyer le code", verify_code: "Vérifie ton numéro", code_sent_to: "Code envoyé au",
    resend_in: "Renvoyer dans", wrong_number: "Mauvais numéro ?",
    freight: "Fret Lourd", moving: "Déménagement", towing: "Remorquage", bus: "Bus & Minibus",
    freight_desc: "Marchandises pros", moving_desc: "Particuliers / bureaux",
    towing_desc: "Urgence panne", bus_desc: "Groupes & événements",
    feed: "Annonces", wallet: "Portefeuille", history: "Historique", profile: "Profil",
    points: "PTS", points_balance: "Solde",
    new_lead: "NOUVEAU", full_lead: "COMPLET", expired_status: "EXPIRÉ",
    buyers_count: "acheteurs", swipe_to_buy: "Glisser pour acheter",
    cost_in_points: "points pour débloquer", bought: "Acheté !",
    call_client: "Appeler", whatsapp_client: "WhatsApp", back_to_feed: "Retour aux annonces",
    recharge: "Recharger", history_empty: "Aucune annonce achetée",
    what_you_need: "De quoi avez-vous besoin ?",
    pickup_location: "Lieu de départ", dropoff_location: "Lieu d'arrivée",
    description: "Description", urgency: "Urgence",
    immediate: "Immédiat", today: "Aujourd'hui", this_week: "Cette semaine", flexible: "Flexible",
    publish: "Publier mon annonce", next: "Suivant", previous: "Précédent",
    submit: "Confirmer", publishing: "Publication...",
    interested_drivers: "chauffeurs intéressés", expires_in: "Expire dans",
    continue: "Continuer", cancel: "Annuler", confirm: "Confirmer", close: "Fermer", skip: "Passer",
    yes: "Oui", no: "Non", optional: "optionnel", required: "requis", km: "km", tnd: "TND",
    dashboard: "Tableau de bord", active_leads: "Annonces actives",
    online_drivers: "Chauffeurs connectés", transactions_today: "Transactions 24h",
    revenue_today: "Revenus 24h", leads: "Annonces", drivers: "Chauffeurs", settings: "Paramètres",
    customize_brand: "Personnaliser la marque", brand_name: "Nom de la marque",
    primary_color: "Couleur primaire", logo_emoji: "Logo (emoji)", reset_brand: "Réinitialiser", apply: "Appliquer",
    select_verticals: "Tes verticales", select_verticals_desc: "Reçois uniquement les annonces qui te correspondent",
    step: "Étape",
  },
  ar: {
    welcome: "مرحبا", tagline_full: "أقصر طريق لنقلك",
    iam_driver: "أنا سائق", iam_client: "أحتاج خدمة نقل", admin_access: "وضع الإدارة",
    enter_phone: "أدخل رقمك للمتابعة", phone_number: "رقم الهاتف",
    send_code: "إرسال الرمز", verify_code: "تحقق من رقمك", code_sent_to: "تم إرسال الرمز إلى",
    resend_in: "إعادة الإرسال خلال", wrong_number: "رقم خاطئ؟",
    freight: "شحن ثقيل", moving: "نقل أثاث", towing: "إصلاح طوارئ", bus: "حافلات",
    freight_desc: "بضائع للمحترفين", moving_desc: "أفراد ومكاتب",
    towing_desc: "طوارئ عطل", bus_desc: "مجموعات وفعاليات",
    feed: "الإعلانات", wallet: "المحفظة", history: "السجل", profile: "الملف",
    points: "نقطة", points_balance: "الرصيد",
    new_lead: "جديد", full_lead: "ممتلئ", expired_status: "منتهي",
    buyers_count: "مشترين", swipe_to_buy: "اسحب للشراء",
    cost_in_points: "نقطة لإلغاء القفل", bought: "تم!",
    call_client: "اتصال", whatsapp_client: "واتساب", back_to_feed: "العودة",
    recharge: "شحن", history_empty: "لا توجد إعلانات",
    what_you_need: "ماذا تحتاج؟",
    pickup_location: "نقطة الانطلاق", dropoff_location: "نقطة الوصول",
    description: "الوصف", urgency: "الإلحاح",
    immediate: "فوري", today: "اليوم", this_week: "هذا الأسبوع", flexible: "مرن",
    publish: "نشر", next: "التالي", previous: "السابق",
    submit: "تأكيد", publishing: "جاري النشر...",
    interested_drivers: "سائق مهتم", expires_in: "ينتهي خلال",
    continue: "متابعة", cancel: "إلغاء", confirm: "تأكيد", close: "إغلاق", skip: "تخطي",
    yes: "نعم", no: "لا", optional: "اختياري", required: "مطلوب", km: "كم", tnd: "د.ت",
    dashboard: "لوحة التحكم", active_leads: "الإعلانات النشطة",
    online_drivers: "السائقون المتصلون", transactions_today: "معاملات 24س",
    revenue_today: "إيرادات 24س", leads: "الإعلانات", drivers: "السائقون", settings: "الإعدادات",
    customize_brand: "تخصيص العلامة", brand_name: "اسم العلامة",
    primary_color: "اللون الأساسي", logo_emoji: "الشعار", reset_brand: "إعادة تعيين", apply: "تطبيق",
    select_verticals: "تخصصاتك", select_verticals_desc: "استلم فقط الإعلانات المناسبة لك",
    step: "خطوة",
  },
};
// ===========================================================================
// VERTICAL CONFIGS
// ===========================================================================
const VERTICAL_CONFIGS = {
  freight: {
    icon: Truck, color: "#0066FF",
    cargoTypes: [
      { id: "pallet", label: "Palette / Colis", icon: "📦" },
      { id: "bulk", label: "Vrac", icon: "🪨" },
      { id: "refrigerated", label: "Frigorifique", icon: "❄️" },
      { id: "dangerous", label: "Matières dangereuses (ADR)", icon: "☢️" },
      { id: "fragile", label: "Fragile", icon: "🥚" },
      { id: "oversized", label: "Encombrant / Hors-gabarit", icon: "📐" },
      { id: "liquid", label: "Liquide non dangereux", icon: "💧" },
      { id: "livestock", label: "Bétail vivant", icon: "🐄" },
    ],
    tonnages: [
      { id: "0_1", label: "Moins de 1 tonne" },
      { id: "1_3", label: "1 à 3 tonnes" },
      { id: "3_5", label: "3 à 5 tonnes" },
      { id: "5_10", label: "5 à 10 tonnes" },
      { id: "10_20", label: "10 à 20 tonnes" },
      { id: "20p", label: "Plus de 20 tonnes" },
    ],
    truckTypes: [
      { id: "flatbed", label: "Plateau", desc: "Matériaux longs" },
      { id: "box", label: "Fourgon fermé", desc: "Protection intempéries" },
      { id: "curtain", label: "Bâché", desc: "Polyvalent" },
      { id: "semi", label: "Semi-remorque", desc: "Gros volume" },
      { id: "tank", label: "Citerne", desc: "Liquides vrac" },
      { id: "fridge", label: "Frigorifique", desc: "Frais / surgelé" },
      { id: "tipper", label: "Benne", desc: "BTP" },
      { id: "container", label: "Porte-conteneurs", desc: "Maritime" },
    ],
    loadingMethods: ["Hayon élévateur", "Transpalette manuel", "Transpalette électrique", "Grue auxiliaire", "Manutention humaine", "Quai à quai", "Élingues / Sangles"],
    documents: ["CMR international", "Lettre de voiture", "Bon de livraison", "Certificat ADR", "Facture commerciale", "Aucun"],
    frequencies: ["Course unique", "Plusieurs fois / semaine", "Hebdomadaire récurrent", "Mensuel récurrent", "Contrat annuel"],
    insuranceLevels: [
      { id: "none", label: "Sans assurance", desc: "À mes risques" },
      { id: "standard", label: "Standard", desc: "Jusqu'à 10K TND" },
      { id: "premium", label: "Haute valeur", desc: "10K-100K TND" },
      { id: "custom", label: "Sur-mesure", desc: "> 100K TND" },
    ],
  },
  moving: {
    icon: Package, color: "#16A34A",
    propertyTypes: [
      { id: "studio", label: "Studio", desc: "1 pièce + cuisine" },
      { id: "t2", label: "T2 / 2 pièces", desc: "2 pièces principales" },
      { id: "t3", label: "T3 / 3 pièces", desc: "3 pièces" },
      { id: "t4", label: "T4+ / Grand appart", desc: "4+ pièces" },
      { id: "house_s", label: "Petite maison", desc: "Moins de 100m²" },
      { id: "house_m", label: "Maison moyenne", desc: "100-200m²" },
      { id: "house_l", label: "Grande maison", desc: "Plus de 200m²" },
      { id: "office", label: "Bureau / Local pro", desc: "Espace pro" },
    ],
    floorOptions: ["Rez-de-chaussée", "Étage 1", "Étage 2", "Étage 3", "Étage 4", "Étage 5+"],
    additionalServices: [
      { id: "packing", label: "Emballage des cartons", icon: "📦", price: 50 },
      { id: "unpacking", label: "Déballage à l'arrivée", icon: "📤", price: 40 },
      { id: "disassembly", label: "Démontage meubles", icon: "🔧", price: 60 },
      { id: "assembly", label: "Montage à l'arrivée", icon: "🔨", price: 60 },
      { id: "storage", label: "Garde-meubles", icon: "🏬", price: 80 },
      { id: "monte_meubles", label: "Monte-meuble", icon: "🏗️", price: 120 },
      { id: "cleaning", label: "Nettoyage post-démén.", icon: "🧹", price: 70 },
      { id: "insurance_plus", label: "Assurance valeur déclarée", icon: "🛡️", price: 35 },
    ],
    specialItems: [
      { id: "piano", label: "Piano", icon: "🎹" },
      { id: "safe", label: "Coffre-fort lourd", icon: "🔒" },
      { id: "art", label: "Œuvres d'art", icon: "🖼️" },
      { id: "antique", label: "Mobilier ancien", icon: "🪑" },
      { id: "appliance", label: "Électroménager XL", icon: "🧊" },
      { id: "aquarium", label: "Aquarium plein", icon: "🐟" },
      { id: "billard", label: "Table de billard", icon: "🎱" },
      { id: "gym", label: "Équipement de sport", icon: "🏋️" },
    ],
    flexibility: ["Date fixe impérative", "± 1 jour acceptable", "± 3 jours acceptable", "Dans la semaine", "Flexible"],
  },
  towing: {
    icon: Wrench, color: "#DC2626",
    vehicleTypes: [
      { id: "car", label: "Voiture particulière", icon: "🚗" },
      { id: "suv", label: "SUV / 4x4", icon: "🚙" },
      { id: "van", label: "Utilitaire", icon: "🚐" },
      { id: "truck_light", label: "Camion léger", icon: "🚚" },
      { id: "truck_heavy", label: "Poids lourd", icon: "🚛" },
      { id: "motorcycle", label: "Moto / Scooter", icon: "🏍️" },
      { id: "bus", label: "Bus", icon: "🚌" },
      { id: "trailer", label: "Remorque seule", icon: "🛻" },
    ],
    breakdownTypes: [
      { id: "mechanical", label: "Panne mécanique", icon: "⚙️" },
      { id: "electrical", label: "Panne électrique", icon: "⚡" },
      { id: "battery", label: "Batterie à plat", icon: "🔋" },
      { id: "tire", label: "Pneu crevé", icon: "🛞" },
      { id: "fuel", label: "Panne sèche", icon: "⛽" },
      { id: "accident", label: "Suite à accident", icon: "💥" },
      { id: "stuck", label: "Embourbé / coincé", icon: "🟫" },
      { id: "lockout", label: "Clés à l'intérieur", icon: "🔑" },
    ],
    locationContext: [
      { id: "highway", label: "Sur autoroute", icon: "🛣️" },
      { id: "city", label: "En ville", icon: "🏙️" },
      { id: "rural", label: "Zone rurale", icon: "🌾" },
      { id: "parking", label: "Dans un parking", icon: "🅿️" },
      { id: "underground", label: "Sous-sol", icon: "🏠" },
      { id: "offroad", label: "Hors route", icon: "🏔️" },
    ],
    vehicleState: [
      { id: "rolling", label: "Roule sur ses roues", icon: "✅" },
      { id: "non_rolling", label: "Ne roule pas", icon: "⚠️" },
      { id: "damaged", label: "Accidenté récupérable", icon: "🚨" },
      { id: "overturned", label: "Retourné / Sur le côté", icon: "❌" },
    ],
    destinationTypes: [
      { id: "garage_my", label: "Mon garage habituel" },
      { id: "garage_nearest", label: "Garage le plus proche" },
      { id: "concession", label: "Concession de la marque" },
      { id: "home", label: "Mon domicile" },
      { id: "sale_point", label: "Casse / Point de vente" },
    ],
  },
  bus: {
    icon: Bus, color: "#EAB308",
    serviceTypes: [
      { id: "school", label: "Transport scolaire", icon: "🎓", desc: "Trajet régulier élèves" },
      { id: "event", label: "Événement privé", icon: "🎉", desc: "Fête, anniversaire" },
      { id: "tourism", label: "Excursion touristique", icon: "🏛️", desc: "Visites, voyages" },
      { id: "airport", label: "Navette aéroport", icon: "✈️", desc: "Transferts" },
      { id: "corporate", label: "Sortie d'entreprise", icon: "💼", desc: "Team building" },
      { id: "wedding", label: "Mariage", icon: "💍", desc: "Invités cérémonie" },
      { id: "sport", label: "Équipe sportive", icon: "⚽", desc: "Déplacement équipe" },
      { id: "shuttle", label: "Navette régulière", icon: "🔄", desc: "Pendulaire" },
    ],
    capacities: [
      { id: "8_15", label: "8 à 15 passagers", desc: "Minibus" },
      { id: "16_30", label: "16 à 30 passagers", desc: "Bus moyen" },
      { id: "31_50", label: "31 à 50 passagers", desc: "Grand bus" },
      { id: "50p", label: "Plus de 50 passagers", desc: "Bus articulé" },
      { id: "100p", label: "Plusieurs bus (> 100)", desc: "Flotte complète" },
    ],
    duration: ["Aller simple", "Aller-retour journée", "Demi-journée (4h)", "Journée complète (8h)", "Plusieurs jours", "Mise à disposition mensuelle"],
    amenities: [
      { id: "ac", label: "Climatisation", icon: "❄️" },
      { id: "wifi", label: "WiFi à bord", icon: "📶" },
      { id: "mic", label: "Micro et sono", icon: "🎤" },
      { id: "tv", label: "TV / Écrans", icon: "📺" },
      { id: "fridge", label: "Mini-frigo", icon: "🧊" },
      { id: "seatbelt", label: "Ceintures (enfants)", icon: "🔗" },
      { id: "pmr", label: "Accès PMR", icon: "♿" },
      { id: "luggage", label: "Soute à bagages XL", icon: "🧳" },
    ],
    driverOptions: [
      { id: "one", label: "1 chauffeur", desc: "Trajet < 8h" },
      { id: "two", label: "2 chauffeurs", desc: "Trajet long / nuit" },
    ],
  },
};
// ===========================================================================
// MOCK DATA GENERATORS
// ===========================================================================
const TUNISIAN_CITIES = ["Tunis", "Ariana", "Ben Arous", "Manouba", "La Marsa", "Carthage", "Sousse", "Sfax", "Bizerte", "Nabeul", "Hammamet", "Monastir", "Kairouan", "Gabès"];
const TUNISIAN_NEIGHBORHOODS = ["Lac 1", "Lac 2", "Centre-ville", "El Menzah", "Le Bardo", "La Soukra", "Lafayette", "Sidi Bou Saïd", "Mégrine", "Mourouj", "Bir Kassaa", "Hammam-Lif"];
const FIRSTNAMES_M = ["Mohamed", "Karim", "Sami", "Slim", "Anis", "Ahmed", "Ali", "Mehdi", "Yassine", "Foued", "Bilel", "Riadh", "Nizar", "Hassen", "Walid", "Tarek", "Naceur"];
const FIRSTNAMES_F = ["Amira", "Sarra", "Yasmine", "Leila", "Mariem", "Sonia", "Hanen", "Khaoula", "Salma", "Nadia", "Olfa", "Rim"];
const LASTNAMES = ["Ben Salah", "Trabelsi", "Bouazizi", "Mansouri", "Sassi", "Karoui", "Jemli", "Sfar", "Ghariani", "Hadj Ali", "Khalfaoui", "Brahimi"];
const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rndPhone = () => `+216 ${rnd(["5", "9", "2"])}${rndInt(1, 9)} ${rndInt(100, 999)} ${rndInt(100, 999)}`;
const maskPhone = (p) => p.replace(/(\+216 \d)(.+)(\d{3})/, "$1• ••• •$3");
const rndPlate = () => `${rndInt(100, 999)} TUN ${rndInt(1000, 9999)}`;
function generateLeads(count = 32) {
  const out = [];
  const verticals = ["freight", "moving", "towing", "bus"];
  for (let i = 0; i < count; i++) {
    const vertical = verticals[i % 4];
    const pickup = rnd(TUNISIAN_CITIES);
    let dropoff = rnd(TUNISIAN_CITIES);
    while (dropoff === pickup) dropoff = rnd(TUNISIAN_CITIES);
    const isFemale = Math.random() > 0.7;
    const firstName = rnd(isFemale ? FIRSTNAMES_F : FIRSTNAMES_M);
    const lastName = rnd(LASTNAMES);
    const urgency = vertical === "towing" ? "immediate" : rnd(["immediate", "today", "this_week", "flexible"]);
    const costMap = { freight: rndInt(80, 200), moving: rndInt(15, 30), towing: rndInt(30, 50), bus: rndInt(40, 80) };
    const priceMap = {
      freight: [rndInt(400, 800), rndInt(800, 2500)],
      moving: [rndInt(200, 500), rndInt(500, 1500)],
      towing: [rndInt(100, 200), rndInt(200, 500)],
      bus: [rndInt(300, 700), rndInt(700, 2000)],
    };
    const buyers = rndInt(0, 5);
    const status = buyers >= 5 ? "full" : (Math.random() > 0.96 ? "expired" : "available");
    const postedMinAgo = rndInt(2, 320);
    let metadata = {};
    if (vertical === "freight") {
      metadata = {
        cargoType: rnd(VERTICAL_CONFIGS.freight.cargoTypes),
        tonnage: rnd(VERTICAL_CONFIGS.freight.tonnages),
        truckType: rnd(VERTICAL_CONFIGS.freight.truckTypes),
        loadingMethod: rnd(VERTICAL_CONFIGS.freight.loadingMethods),
        insurance: rnd(VERTICAL_CONFIGS.freight.insuranceLevels),
      };
    } else if (vertical === "moving") {
      metadata = {
        propertyType: rnd(VERTICAL_CONFIGS.moving.propertyTypes),
        floorFrom: rnd(VERTICAL_CONFIGS.moving.floorOptions),
        floorTo: rnd(VERTICAL_CONFIGS.moving.floorOptions),
        hasElevatorFrom: Math.random() > 0.5,
        hasElevatorTo: Math.random() > 0.5,
        services: [...new Set([rnd(VERTICAL_CONFIGS.moving.additionalServices), rnd(VERTICAL_CONFIGS.moving.additionalServices)])],
      };
    } else if (vertical === "towing") {
      metadata = {
        vehicleType: rnd(VERTICAL_CONFIGS.towing.vehicleTypes),
        breakdownType: rnd(VERTICAL_CONFIGS.towing.breakdownTypes),
        locationContext: rnd(VERTICAL_CONFIGS.towing.locationContext),
        vehicleState: rnd(VERTICAL_CONFIGS.towing.vehicleState),
      };
    } else {
      metadata = {
        serviceType: rnd(VERTICAL_CONFIGS.bus.serviceTypes),
        capacity: rnd(VERTICAL_CONFIGS.bus.capacities),
        duration: rnd(VERTICAL_CONFIGS.bus.duration),
        amenities: [...new Set([rnd(VERTICAL_CONFIGS.bus.amenities), rnd(VERTICAL_CONFIGS.bus.amenities)])],
      };
    }
    const phone = rndPhone();
    out.push({
      id: `lead_${i + 1}`, vertical, status, urgency,
      pickupCity: pickup, pickupAddress: `${rnd(TUNISIAN_NEIGHBORHOODS)}, ${pickup}`,
      dropoffCity: dropoff, dropoffAddress: `${rnd(TUNISIAN_NEIGHBORHOODS)}, ${dropoff}`,
      distanceKm: rndInt(5, 320),
      estimatedPriceMin: priceMap[vertical][0], estimatedPriceMax: priceMap[vertical][1],
      leadCostPoints: costMap[vertical], buyersCount: buyers, maxBuyers: 5,
      clientFirstName: firstName, clientLastName: lastName,
      clientPhone: phone, clientPhoneMasked: maskPhone(phone),
      postedMinAgo, metadata,
    });
  }
  return out.sort((a, b) => a.postedMinAgo - b.postedMinAgo);
}
function generateTransactions(count = 18) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const type = i === count - 1 ? "bonus" : rnd(["purchase", "purchase", "purchase", "recharge", "refund"]);
    let amount = 0, desc = "";
    if (type === "purchase") { amount = -rndInt(15, 50); desc = `Annonce ${rnd(["Fret", "Déménagement", "Remorquage", "Bus"])}`; }
    else if (type === "recharge") { amount = rnd([50, 100, 200, 500]); desc = `Recharge ${rnd(["Carte bancaire", "Wafacash", "D17 Poste"])}`; }
    else if (type === "refund") { amount = rndInt(15, 50); desc = "Remboursement (ghosting client)"; }
    else { amount = 50; desc = "Bonus de bienvenue"; }
    out.push({ id: `tx_${i}`, type, amount, description: desc, hoursAgo: i * 3 + rndInt(0, 2) });
  }
  return out;
}
function generateDriversForLead(min = 1, max = 5) {
  const n = rndInt(min, max);
  const out = [];
  for (let i = 0; i < n; i++) {
    const isFemale = Math.random() > 0.85;
    out.push({
      id: `drv_${i}`,
      firstName: rnd(isFemale ? FIRSTNAMES_F : FIRSTNAMES_M),
      rating: (4 + Math.random()).toFixed(1),
      totalTrips: rndInt(50, 800),
      vehicleType: rnd(["Plateau", "Fourgon", "Frigo", "Bâché", "Semi-remorque"]),
      vehiclePlate: rndPlate(),
      distanceKm: rndInt(1, 25), phone: rndPhone(),
      seed: i,
    });
  }
  return out;
}
// ===========================================================================
// THEME CONTEXT
// ===========================================================================
const useThemeStyles = (theme, brand) => {
  const t = THEMES[theme];
  return useMemo(() => ({
    bg: t.bg, surface: t.surface, surfaceAlt: t.surfaceAlt, surfaceMuted: t.surfaceMuted, card: t.card,
    text: t.text, textMuted: t.textMuted, textSubtle: t.textSubtle,
    border: t.border, borderSoft: t.borderSoft, borderStrong: t.borderStrong,
    shadow: t.shadow, shadowSm: t.shadowSm, shadowMd: t.shadowMd, shadowLg: t.shadowLg, shadowXl: t.shadowXl,
    primary: brand.primary, primaryFg: brand.primaryFg,
    success: t.success, successBg: t.successBg, successFg: t.successFg,
    warning: t.warning, warningBg: t.warningBg, warningFg: t.warningFg,
    danger: t.danger, dangerBg: t.dangerBg, dangerFg: t.dangerFg,
    info: t.info, infoBg: t.infoBg, infoFg: t.infoFg,
    overlay: t.overlay,
    isDark: theme === "dark",
  }), [theme, brand]);
};
// ===========================================================================
// ANIMATION UTILITIES
// ===========================================================================
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
function useAnimatedNumber(target, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef(null);
  useEffect(() => {
    fromRef.current = value;
    startRef.current = null;
    let raf;
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(fromRef.current + (target - fromRef.current) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}
function Skeleton({ width = "100%", height = 16, radius = 8, c }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: `linear-gradient(90deg, ${c.surfaceAlt} 0%, ${c.borderSoft} 50%, ${c.surfaceAlt} 100%)`,
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s ease-in-out infinite",
    }} />
  );
}
function AnimatedCheck({ size = 48, color = "#FFFFFF", strokeWidth = 3 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" style={{ display: "block" }}>
      <circle cx="26" cy="26" r="24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeOpacity="0.25" />
      <path
        d="M14 27 L23 35 L38 18"
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        style={{
          strokeDasharray: 60, strokeDashoffset: 60,
          animation: "drawCheck 500ms 100ms cubic-bezier(0.65, 0, 0.35, 1) forwards",
        }}
      />
    </svg>
  );
}
function TapScale({ children, onClick, disabled, style, scale = 0.97 }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={!disabled ? onClick : undefined}
      style={{
        transform: pressed ? `scale(${scale})` : "scale(1)",
        transition: `transform 200ms ${SPRING}`,
        cursor: disabled ? "not-allowed" : (onClick ? "pointer" : "default"),
        opacity: disabled ? 0.4 : 1,
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
// ===========================================================================
// UI PRIMITIVES
// ===========================================================================
function BrutButton({ children, variant = "primary", size = "md", onClick, disabled, fullWidth, icon: Icon, iconRight: IconRight, c, type = "button" }) {
  const sizes = {
    sm: { padX: 14, padY: 8, fontSize: 14, minH: 38, gap: 6, iconSize: 16, radius: 10 },
    md: { padX: 18, padY: 12, fontSize: 15, minH: 48, gap: 8, iconSize: 18, radius: 12 },
    lg: { padX: 22, padY: 16, fontSize: 16, minH: 56, gap: 10, iconSize: 20, radius: 14 },
  };
  const s = sizes[size];
  const variants = {
    primary: {
      bg: c.primary, fg: c.primaryFg,
      shadow: `0 1px 2px rgba(0,0,0,0.06), 0 6px 20px ${hexA(c.primary, 0.30)}`,
      hoverShadow: `0 2px 4px rgba(0,0,0,0.08), 0 10px 28px ${hexA(c.primary, 0.40)}`,
    },
    secondary: {
      bg: c.surfaceAlt, fg: c.text,
      shadow: "none", hoverShadow: c.shadowSm,
    },
    ghost: { bg: "transparent", fg: c.text, shadow: "none", hoverShadow: "none" },
    success: { bg: c.success, fg: "#FFFFFF",
      shadow: `0 1px 2px rgba(0,0,0,0.06), 0 6px 18px ${hexA(c.success, 0.30)}`,
      hoverShadow: `0 2px 4px rgba(0,0,0,0.08), 0 10px 24px ${hexA(c.success, 0.40)}`,
    },
    danger: { bg: c.danger, fg: "#FFFFFF",
      shadow: `0 1px 2px rgba(0,0,0,0.06), 0 6px 18px ${hexA(c.danger, 0.30)}`,
      hoverShadow: `0 2px 4px rgba(0,0,0,0.08), 0 10px 24px ${hexA(c.danger, 0.40)}`,
    },
    dark: { bg: c.text, fg: c.bg, shadow: c.shadowMd, hoverShadow: c.shadowLg },
  };
  const v = variants[variant];
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => { setPressed(false); setHovered(false); }}
      onPointerEnter={() => setHovered(true)}
      style={{
        backgroundColor: v.bg, color: v.fg, border: "none",
        boxShadow: pressed ? "none" : (hovered ? v.hoverShadow : v.shadow),
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: `transform 200ms ${SPRING}, box-shadow 200ms ${EASE_OUT}, background-color 150ms`,
        padding: `${s.padY}px ${s.padX}px`,
        fontSize: s.fontSize, fontWeight: 600, letterSpacing: "-0.005em",
        borderRadius: s.radius, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1, width: fullWidth ? "100%" : "auto",
        minHeight: s.minH, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: s.gap,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
        userSelect: "none", WebkitTapHighlightColor: "transparent",
      }}
    >
      {Icon && <Icon size={s.iconSize} strokeWidth={2.25} />}
      <span>{children}</span>
      {IconRight && <IconRight size={s.iconSize} strokeWidth={2.25} />}
    </button>
  );
}
function hexA(hex, alpha) {
  const h = (hex || "#000000").replace("#", "");
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function BrutCard({ children, c, style = {}, onClick, padding = 18, accent }) {
  const [hovered, setHovered] = useState(false);
  const interactive = !!onClick;
  return (
    <div
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
        backgroundColor: c.card, color: c.text,
        border: `1px solid ${c.border}`,
        boxShadow: interactive && hovered ? c.shadowLg : c.shadowSm,
        borderRadius: 18, padding,
        cursor: interactive ? "pointer" : "default",
        transform: interactive && hovered ? "translateY(-2px)" : "translateY(0)",
        transition: `transform 250ms ${EASE_OUT}, box-shadow 250ms ${EASE_OUT}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function BrutChip({ children, c, color, bgColor, icon: Icon, size = "md", uppercase = false }) {
  const sizes = { sm: { fs: 11, px: 8, py: 3, ih: 12 }, md: { fs: 12, px: 10, py: 5, ih: 14 } };
  const s = sizes[size];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      backgroundColor: bgColor || c.surfaceAlt, color: color || c.textMuted,
      padding: `${s.py}px ${s.px}px`, borderRadius: 999,
      fontSize: s.fs, fontWeight: 600, letterSpacing: uppercase ? "0.04em" : "-0.005em",
      textTransform: uppercase ? "uppercase" : "none", whiteSpace: "nowrap",
    }}>
      {Icon && <Icon size={s.ih} strokeWidth={2.25} />}
      {children}
    </span>
  );
}
function BrutInput({ value, onChange, placeholder, type = "text", c, label, prefix, fullWidth = true, autoFocus, maxLength, dir }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ width: fullWidth ? "100%" : "auto" }}>
      {label && <div style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, marginLeft: 2 }}>{label}</div>}
      <div style={{
        display: "flex", alignItems: "center",
        border: `1.5px solid ${focused ? c.primary : c.border}`,
        borderRadius: 14,
        backgroundColor: c.surfaceAlt,
        boxShadow: focused ? `0 0 0 4px ${hexA(c.primary, 0.15)}` : "none",
        transition: `box-shadow 200ms ${EASE_OUT}, border-color 200ms ${EASE_OUT}`,
        overflow: "hidden",
      }}>
        {prefix && <div style={{ padding: "0 12px", fontSize: 15, fontWeight: 500, color: c.textMuted, alignSelf: "stretch", display: "flex", alignItems: "center" }}>{prefix}</div>}
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} autoFocus={autoFocus} maxLength={maxLength} dir={dir}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            flex: 1, padding: "14px 14px", fontSize: 16, fontWeight: 500,
            backgroundColor: "transparent", color: c.text,
            border: "none", outline: "none", minWidth: 0,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
          }}
        />
      </div>
    </div>
  );
}
function BrutSelect({ value, onChange, options, c, label, placeholder = "Sélectionner..." }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => (typeof o === "string" ? o : o.id) === value);
  const selectedLabel = selected ? (typeof selected === "string" ? selected : selected.label) : null;
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {label && <div style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, marginLeft: 2 }}>{label}</div>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 14px", fontSize: 15, fontWeight: 500,
          backgroundColor: c.surfaceAlt, color: selectedLabel ? c.text : c.textSubtle,
          border: `1.5px solid ${open ? c.primary : c.border}`,
          boxShadow: open ? `0 0 0 4px ${hexA(c.primary, 0.15)}` : "none",
          borderRadius: 14,
          cursor: "pointer", textAlign: "left",
          transition: `box-shadow 200ms ${EASE_OUT}, border-color 200ms`,
          fontFamily: "inherit",
        }}
      >
        <span>{selectedLabel || placeholder}</span>
        <ChevronDown size={18} strokeWidth={2.25} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: `transform 250ms ${EASE_OUT}`, color: c.textMuted }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 50,
          backgroundColor: c.card, border: `1px solid ${c.border}`,
          borderRadius: 14, boxShadow: c.shadowLg,
          maxHeight: 280, overflowY: "auto",
          animation: `dropIn 200ms ${EASE_OUT}`,
        }}>
          {options.map((opt, i) => {
            const id = typeof opt === "string" ? opt : opt.id;
            const lbl = typeof opt === "string" ? opt : opt.label;
            const desc = typeof opt === "string" ? null : opt.desc;
            const icon = typeof opt === "string" ? null : opt.icon;
            const active = id === value;
            return (
              <div
                key={id}
                onClick={() => { onChange(id); setOpen(false); }}
                style={{
                  padding: "12px 14px", cursor: "pointer",
                  backgroundColor: active ? hexA(c.primary, 0.08) : "transparent",
                  borderBottom: i < options.length - 1 ? `1px solid ${c.borderSoft}` : "none",
                  display: "flex", alignItems: "center", gap: 10,
                  transition: "background-color 120ms",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = active ? hexA(c.primary, 0.12) : c.surfaceAlt}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = active ? hexA(c.primary, 0.08) : "transparent"}
              >
                {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{lbl}</div>
                  {desc && <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{desc}</div>}
                </div>
                {active && <Check size={16} color={c.primary} strokeWidth={3} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
function BrutGridChoice({ options, value, onChange, c, multi = false, columns = 2 }) {
  const isSelected = (id) => multi ? (value || []).includes(id) : value === id;
  const toggle = (id) => {
    if (multi) {
      const arr = value || [];
      onChange(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);
    } else { onChange(id); }
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 10 }}>
      {options.map((opt) => {
        const id = opt.id || opt;
        const lbl = opt.label || opt;
        const desc = opt.desc;
        const icon = opt.icon;
        const sel = isSelected(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
            style={{
              padding: 14, textAlign: "left", cursor: "pointer",
              backgroundColor: sel ? hexA(c.primary, 0.1) : c.surfaceAlt,
              color: c.text,
              border: `1.5px solid ${sel ? c.primary : "transparent"}`,
              borderRadius: 14,
              boxShadow: sel ? `0 0 0 3px ${hexA(c.primary, 0.10)}` : "none",
              transition: `all 200ms ${EASE_OUT}`,
              minHeight: 80, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4,
              fontFamily: "inherit",
              WebkitTapHighlightColor: "transparent",
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
            onPointerUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            onPointerLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {icon && typeof icon === "string" && <div style={{ fontSize: 22, lineHeight: 1 }}>{icon}</div>}
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: sel ? c.primary : c.text }}>{lbl}</div>
            {desc && <div style={{ fontSize: 12, fontWeight: 400, color: c.textMuted, lineHeight: 1.3 }}>{desc}</div>}
          </button>
        );
      })}
    </div>
  );
}
function VerticalIconBlock({ vertical, c, size = 44, soft = true }) {
  const cfg = VERTICAL_CONFIGS[vertical];
  const Icon = cfg.icon;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      backgroundColor: soft ? hexA(cfg.color, 0.12) : cfg.color,
      color: soft ? cfg.color : "#FFFFFF",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <Icon size={size * 0.52} strokeWidth={2.25} />
    </div>
  );
}
function UrgencyChip({ urgency, c, t }) {
  const config = {
    immediate: { bg: c.dangerBg, color: c.danger, icon: AlertCircle, label: t.immediate },
    today: { bg: c.warningBg, color: c.warningFg, icon: Clock, label: t.today },
    this_week: { bg: c.infoBg, color: c.infoFg, icon: Calendar, label: t.this_week },
    flexible: { bg: c.surfaceAlt, color: c.textMuted, icon: Calendar, label: t.flexible },
  };
  const cfg = config[urgency] || config.flexible;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      backgroundColor: cfg.bg, color: cfg.color,
      padding: "4px 9px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: "-0.005em",
    }}>
      <Icon size={11} strokeWidth={2.5} />
      {cfg.label}
    </span>
  );
}
function BuyersIndicator({ count, max, c }) {
  const pct = count / max;
  const color = pct >= 1 ? c.danger : pct >= 0.6 ? c.warning : c.success;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} style={{
            width: 5, height: 14,
            backgroundColor: i < count ? color : c.borderSoft,
            borderRadius: 2,
            transition: `background-color 300ms ${EASE_OUT}`,
          }} />
        ))}
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, fontVariantNumeric: "tabular-nums" }}>{count}/{max}</span>
    </div>
  );
}
// ===========================================================================
// SWIPE TO BUY
// ===========================================================================
function SwipeToBuy({ onComplete, label, c, costPts }) {
  const containerRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const startXRef = useRef(0);
  const HANDLE = 56;
  const COMPLETE_THRESHOLD = 0.88;
  const handleStart = (clientX) => {
    if (completed) return;
    setDragging(true);
    startXRef.current = clientX - dragX;
  };
  const handleMove = (clientX) => {
    if (!dragging || completed) return;
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const maxDrag = containerWidth - HANDLE - 8;
    const newX = Math.max(0, Math.min(maxDrag, clientX - startXRef.current));
    setDragX(newX);
    if (newX / maxDrag >= COMPLETE_THRESHOLD && !completed) {
      setCompleted(true);
      setDragX(maxDrag);
      setDragging(false);
      if (navigator.vibrate) navigator.vibrate([30, 20, 50]);
      setTimeout(() => onComplete && onComplete(), 380);
    }
  };
  const handleEnd = () => {
    setDragging(false);
    if (!completed) setDragX(0);
  };
  const containerWidth = containerRef.current?.offsetWidth || 300;
  const maxDrag = containerWidth - HANDLE - 8;
  const progress = maxDrag > 0 ? dragX / maxDrag : 0;
  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      style={{
        position: "relative", width: "100%", height: 64,
        backgroundColor: c.surfaceAlt, color: c.textMuted,
        borderRadius: 999,
        overflow: "hidden", userSelect: "none", touchAction: "none",
        boxShadow: `inset 0 0 0 1px ${c.border}`,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(90deg, ${c.primary} 0%, ${hexA(c.primary, 0.85)} 100%)`,
        clipPath: `inset(0 ${(1 - progress) * 100}% 0 0 round 999px)`,
        transition: dragging ? "none" : `clip-path 380ms ${SPRING}`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em",
        color: completed ? c.primaryFg : (progress > 0.5 ? c.primaryFg : c.text),
        pointerEvents: "none",
        transition: "color 200ms",
        textAlign: "center", padding: "0 60px",
      }}>
        {completed ? "Confirmé" : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {label}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 3,
              padding: "2px 8px", borderRadius: 999,
              backgroundColor: progress > 0.5 ? "rgba(255,255,255,0.25)" : hexA(c.primary, 0.12),
              color: progress > 0.5 ? "#FFFFFF" : c.primary,
              fontSize: 12, fontWeight: 700,
              transition: "all 200ms",
            }}>
              {costPts} pts
            </span>
          </span>
        )}
      </div>
      <div
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        style={{
          position: "absolute", top: 4, left: 4,
          width: HANDLE, height: 56, borderRadius: 999,
          backgroundColor: "#FFFFFF",
          transform: `translateX(${dragX}px) ${completed ? "scale(1.05)" : "scale(1)"}`,
          transition: dragging ? "transform 0ms" : `transform 380ms ${SPRING}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: completed ? "default" : "grab",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)",
          color: completed ? c.success : c.text,
        }}
      >
        {completed ? <Check size={26} strokeWidth={2.5} /> : <ChevronsRight size={22} strokeWidth={2.25} />}
      </div>
    </div>
  );
}
// ===========================================================================
// SCREEN HELPERS
// ===========================================================================
function ScreenContainer({ children, c, scrollable = true, padding = 20, bg }) {
  return (
    <div style={{
      flex: 1, backgroundColor: bg || c.bg, color: c.text,
      overflowY: scrollable ? "auto" : "hidden",
      overflowX: "hidden",
      padding,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
      WebkitOverflowScrolling: "touch",
    }}>
      {children}
    </div>
  );
}
function TopBar({ c, title, onBack, right, transparent = false, brand }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 18px",
      backgroundColor: transparent ? "transparent" : c.bg,
      borderBottom: transparent ? "none" : `2px solid ${c.border}`,
      minHeight: 56, flexShrink: 0,
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ width: 40 }}>
        {onBack && (
          <button onClick={onBack} style={{
            width: 36, height: 36, border: `1px solid ${c.border}`, borderRadius: 10,
            backgroundColor: c.card, color: c.text, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: c.shadowSm,
          }}>
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
        )}
      </div>
      <div style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 800, letterSpacing: "0.02em" }}>
        {title}
      </div>
      <div style={{ width: 40, display: "flex", justifyContent: "flex-end" }}>
        {right}
      </div>
    </div>
  );
}
function BottomNav({ c, current, onNavigate, t }) {
  const items = [
    { id: "driver_feed", label: t.feed, icon: Layers },
    { id: "driver_wallet", label: t.wallet, icon: Wallet },
    { id: "driver_history", label: t.history, icon: History },
    { id: "driver_profile", label: t.profile, icon: User },
  ];
  return (
    <div style={{
      display: "flex",
      borderTop: `1px solid ${c.borderSoft}`,
      backgroundColor: c.bg, padding: "8px 4px",
      paddingBottom: "max(10px, env(safe-area-inset-bottom))",
      flexShrink: 0,
      backdropFilter: "blur(20px)",
    }}>
      {items.map(item => {
        const Icon = item.icon;
        const active = current === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "6px 4px",
              backgroundColor: "transparent", border: "none", cursor: "pointer",
              color: active ? c.primary : c.textMuted,
              transition: `color 200ms ${EASE_OUT}, transform 200ms ${SPRING}`,
              fontFamily: "inherit",
              WebkitTapHighlightColor: "transparent",
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = "scale(0.92)"}
            onPointerUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            onPointerLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} fill={active ? hexA(c.primary, 0.15) : "none"} />
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 500, letterSpacing: "-0.005em" }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
// ===========================================================================
// LEAD CARD
// ===========================================================================
function LeadCard({ lead, onClick, c, t, locale }) {
  const cfg = VERTICAL_CONFIGS[lead.vertical];
  const isExpired = lead.status === "expired";
  const isFull = lead.status === "full";
  const isNew = lead.postedMinAgo < 5;
  const [hovered, setHovered] = useState(false);
  const interactive = !isExpired && !isFull;
  return (
    <div
      onClick={interactive ? onClick : null}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
        backgroundColor: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 18,
        boxShadow: interactive && hovered ? c.shadowLg : c.shadowSm,
        padding: 16, marginBottom: 12,
        cursor: interactive ? "pointer" : "not-allowed",
        opacity: isExpired ? 0.5 : 1,
        position: "relative",
        transform: interactive && hovered ? "translateY(-2px)" : "translateY(0)",
        transition: `transform 250ms ${EASE_OUT}, box-shadow 250ms ${EASE_OUT}, opacity 200ms`,
      }}
    >
      {isNew && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "3px 8px", borderRadius: 999,
          backgroundColor: c.primary, color: c.primaryFg,
          fontSize: 10, fontWeight: 700, letterSpacing: "0.02em",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999, backgroundColor: c.primaryFg,
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
          Nouveau
        </div>
      )}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
        <VerticalIconBlock vertical={lead.vertical} c={c} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 2 }}>
            {t[lead.vertical]}
          </div>
          <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={11} strokeWidth={2.25} />
            il y a {lead.postedMinAgo} min
            <span style={{ color: c.textSubtle }}>·</span>
            <Navigation size={11} strokeWidth={2.25} />
            {lead.distanceKm} {t.km}
          </div>
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 14px", marginBottom: 14,
        backgroundColor: c.surfaceAlt, borderRadius: 12,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: c.success }} />
          <div style={{ width: 2, height: 12, backgroundColor: c.borderSoft, borderRadius: 1 }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: c.danger }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {lead.pickupCity}
          </div>
          <div style={{ height: 6 }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {lead.dropoffCity}
          </div>
        </div>
        <UrgencyChip urgency={lead.urgency} c={c} t={t} />
      </div>
      {lead.vertical === "freight" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          <BrutChip c={c} size="sm">{lead.metadata.cargoType.icon} {lead.metadata.cargoType.label.split(" /")[0]}</BrutChip>
          <BrutChip c={c} size="sm">{lead.metadata.tonnage.label}</BrutChip>
          <BrutChip c={c} size="sm">{lead.metadata.truckType.label}</BrutChip>
        </div>
      )}
      {lead.vertical === "moving" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          <BrutChip c={c} size="sm">{lead.metadata.propertyType.label}</BrutChip>
          <BrutChip c={c} size="sm">📍 {lead.metadata.floorFrom}</BrutChip>
          {lead.metadata.services.length > 0 && <BrutChip c={c} size="sm">+{lead.metadata.services.length} services</BrutChip>}
        </div>
      )}
      {lead.vertical === "towing" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          <BrutChip c={c} size="sm">{lead.metadata.vehicleType.icon} {lead.metadata.vehicleType.label}</BrutChip>
          <BrutChip c={c} size="sm">{lead.metadata.breakdownType.icon} {lead.metadata.breakdownType.label}</BrutChip>
        </div>
      )}
      {lead.vertical === "bus" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          <BrutChip c={c} size="sm">{lead.metadata.serviceType.icon} {lead.metadata.serviceType.label}</BrutChip>
          <BrutChip c={c} size="sm">{lead.metadata.capacity.label}</BrutChip>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: c.textMuted, marginBottom: 2 }}>Prix indicatif</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: c.text, letterSpacing: "-0.01em", fontVariantNumeric: "tabular-nums" }}>
            {lead.estimatedPriceMin}–{lead.estimatedPriceMax} <span style={{ fontSize: 11, fontWeight: 500, color: c.textMuted }}>{t.tnd}</span>
          </div>
        </div>
        <BuyersIndicator count={lead.buyersCount} max={lead.maxBuyers} c={c} />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: c.textMuted, marginBottom: 2 }}>Coût</div>
          <div style={{
            fontSize: 15, fontWeight: 700, color: c.primary,
            display: "inline-flex", alignItems: "center", gap: 3,
            fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em",
          }}>{lead.leadCostPoints} <span style={{ fontSize: 11, fontWeight: 500 }}>pts</span></div>
        </div>
      </div>
    </div>
  );
}
function ScreenSplash({ c, t, brand, navigate }) {
  return (
    <ScreenContainer c={c} padding={0}>
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        padding: "40px 24px 32px",
        animation: `screenSlide 400ms ${EASE_OUT}`,
      }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 32,
            background: `linear-gradient(135deg, ${brand.primary} 0%, ${hexA(brand.primary, 0.7)} 100%)`,
            boxShadow: `0 16px 40px ${hexA(brand.primary, 0.35)}, 0 4px 12px ${hexA(brand.primary, 0.20)}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 64, lineHeight: 1,
            animation: `scaleIn 600ms ${SPRING}`,
          }}>{brand.logoEmoji}</div>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: c.text }}>
              {brand.name}
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: c.textMuted, marginTop: 14, maxWidth: 280, textAlign: "center", lineHeight: 1.4 }}>
              {t.tagline_full}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <BrutButton c={c} variant="primary" size="lg" fullWidth icon={Truck} iconRight={ArrowRight} onClick={() => navigate("driver_login")}>
            {t.iam_driver}
          </BrutButton>
          <BrutButton c={c} variant="secondary" size="lg" fullWidth icon={Package} iconRight={ArrowRight} onClick={() => navigate("client_home")}>
            {t.iam_client}
          </BrutButton>
          <div style={{ height: 4 }} />
          <BrutButton c={c} variant="ghost" size="sm" fullWidth icon={Settings} onClick={() => navigate("admin_dashboard")}>
            {t.admin_access}
          </BrutButton>
        </div>
      </div>
    </ScreenContainer>
  );
}
function ScreenDriverLogin({ c, t, navigate }) {
  const [phone, setPhone] = useState("");
  const valid = phone.replace(/\s/g, "").length >= 8;
  return (
    <>
      <TopBar c={c} title="" onBack={() => navigate("splash")} />
      <ScreenContainer c={c}>
        <div style={{ marginTop: 16, marginBottom: 32 }}>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
            {t.welcome}
          </div>
          <div style={{ fontSize: 15, color: c.textMuted, fontWeight: 500 }}>{t.enter_phone}</div>
        </div>
        <BrutInput
          c={c} label={t.phone_number} prefix="+216"
          value={phone} onChange={(v) => setPhone(v.replace(/[^\d\s]/g, "").slice(0, 11))}
          placeholder="XX XXX XXX" autoFocus type="tel"
        />
        <div style={{ marginTop: 24 }}>
          <BrutButton c={c} variant="primary" size="lg" fullWidth disabled={!valid} iconRight={ArrowRight}
            onClick={() => navigate("driver_otp", { phone: "+216 " + phone })}>
            {t.send_code}
          </BrutButton>
        </div>
        <div style={{ marginTop: 32, padding: 14, backgroundColor: c.surface, borderRadius: 12, border: `1px solid ${c.borderSoft}` }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <Shield size={18} color={c.primary} strokeWidth={2.5} />
            <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.5 }}>
              Pas de vérification d'identité au démarrage. Tu vérifies plus tard, quand tu veux acheter ton premier lead.
            </div>
          </div>
        </div>
      </ScreenContainer>
    </>
  );
}
function ScreenOTP({ c, t, navigate, params, nextScreen }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    inputsRef.current[0]?.focus();
    const it = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(it);
  }, []);
  useEffect(() => {
    if (code.every(d => d.length === 1)) {
      setTimeout(() => navigate(nextScreen, params), 400);
    }
  }, [code]);
  const updateDigit = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code]; next[idx] = val; setCode(next);
    if (val && idx < 3) inputsRef.current[idx + 1]?.focus();
  };
  return (
    <>
      <TopBar c={c} title="" onBack={() => navigate(-1)} />
      <ScreenContainer c={c}>
        <div style={{ marginTop: 16, marginBottom: 32 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
            {t.verify_code}
          </div>
          <div style={{ fontSize: 14, color: c.textMuted }}>{t.code_sent_to} <span style={{ color: c.text, fontWeight: 700 }}>{params.phone}</span></div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
          {code.map((d, i) => (
            <input
              key={i}
              ref={el => inputsRef.current[i] = el}
              value={d}
              onChange={e => updateDigit(i, e.target.value)}
              onKeyDown={e => { if (e.key === "Backspace" && !d && i > 0) inputsRef.current[i - 1]?.focus(); }}
              maxLength={1}
              type="tel"
              style={{
                width: 64, height: 80,
                fontSize: 32, fontWeight: 700, textAlign: "center",
                backgroundColor: c.card, color: c.text,
                border: `1px solid ${c.border}`, borderRadius: 14,
                boxShadow: c.shadowSm,
                outline: "none",
                fontFamily: "'SF Mono', ui-monospace, monospace",
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginBottom: 16, fontSize: 13, color: c.textMuted }}>
          {countdown > 0 ? `${t.resend_in} ${countdown}s` : (
            <span style={{ color: c.primary, fontWeight: 700, cursor: "pointer" }} onClick={() => setCountdown(60)}>
              Renvoyer le code
            </span>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate(-1)} style={{
            background: "transparent", border: "none", color: c.text,
            fontSize: 13, fontWeight: 600, textDecoration: "underline", cursor: "pointer",
          }}>{t.wrong_number}</button>
        </div>
        <div style={{
          marginTop: 40, padding: 14, backgroundColor: c.infoBg,
          borderRadius: 12, border: `1.5px solid ${c.info}`,
          color: c.info, fontSize: 12, fontWeight: 600,
        }}>
          💡 Mode démo : entre n'importe quel code à 4 chiffres
        </div>
      </ScreenContainer>
    </>
  );
}
function ScreenDriverPrefs({ c, t, navigate, prefs, setPrefs }) {
  const verticals = ["freight", "moving", "towing", "bus"];
  const toggle = (v) => {
    const arr = prefs || [];
    setPrefs(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };
  const canContinue = (prefs || []).length > 0;
  return (
    <>
      <TopBar c={c} title="" onBack={() => navigate("driver_login")} />
      <ScreenContainer c={c}>
        <div style={{ marginTop: 8, marginBottom: 28 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
            {t.select_verticals}
          </div>
          <div style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.5 }}>{t.select_verticals_desc}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {verticals.map(v => {
            const cfg = VERTICAL_CONFIGS[v];
            const Icon = cfg.icon;
            const sel = (prefs || []).includes(v);
            return (
              <div
                key={v}
                onClick={() => toggle(v)}
                style={{
                  display: "flex", alignItems: "center", gap: 14, padding: 16,
                  backgroundColor: sel ? cfg.color : c.card,
                  color: sel ? "#FFFFFF" : c.text,
                  border: `1px solid ${c.border}`, borderRadius: 14,
                  boxShadow: sel ? c.shadowSm : c.shadowSm,
                  transform: sel ? "translate(2px, 2px)" : "translate(0,0)",
                  transition: "all 150ms", cursor: "pointer",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: sel ? "rgba(255,255,255,0.2)" : cfg.color, color: "#FFFFFF",
                  border: `2px solid ${sel ? "#FFFFFF" : c.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={26} strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>{t[v]}</div>
                  <div style={{ fontSize: 12, opacity: sel ? 0.9 : 0.7, marginTop: 2 }}>{t[v + "_desc"]}</div>
                </div>
                <div style={{
                  width: 24, height: 24, borderRadius: 8,
                  border: `2px solid ${sel ? "#FFFFFF" : c.border}`,
                  backgroundColor: sel ? "#FFFFFF" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {sel && <Check size={16} strokeWidth={3} color={cfg.color} />}
                </div>
              </div>
            );
          })}
        </div>
        <BrutButton c={c} variant="primary" size="lg" fullWidth disabled={!canContinue} iconRight={ArrowRight} onClick={() => navigate("driver_feed")}>
          {t.continue}
        </BrutButton>
      </ScreenContainer>
    </>
  );
}
function ScreenDriverFeed({ c, t, brand, navigate, leads, prefs, audioOn, setAudioOn, balance }) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => {
    let l = [...leads].filter(x => x.status !== "expired");
    if (prefs && prefs.length > 0) l = l.filter(x => prefs.includes(x.vertical));
    if (filter !== "all") l = l.filter(x => x.vertical === filter);
    return l;
  }, [leads, prefs, filter]);
  return (
    <>
      <div style={{
        padding: "12px 18px 14px",
        backgroundColor: c.bg,
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
        position: "sticky", top: 0, zIndex: 5,
        backdropFilter: "blur(20px)",
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: `linear-gradient(135deg, ${c.primary} 0%, ${hexA(c.primary, 0.7)} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 600, color: c.primaryFg,
          boxShadow: `0 2px 6px ${hexA(c.primary, 0.30)}`,
        }}>M</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 500, marginBottom: 1 }}>{t.points_balance}</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, color: c.text, fontVariantNumeric: "tabular-nums" }}>
            {balance}<span style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginLeft: 4 }}>pts</span>
          </div>
        </div>
        <button
          onClick={() => setAudioOn(!audioOn)}
          style={{
            width: 40, height: 40, borderRadius: 999,
            border: "none",
            backgroundColor: audioOn ? hexA(c.primary, 0.12) : c.surfaceAlt,
            color: audioOn ? c.primary : c.textMuted,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: `background-color 200ms, color 200ms`,
          }}
        >
          {audioOn ? <Volume2 size={18} strokeWidth={2.25} /> : <VolumeX size={18} strokeWidth={2.25} />}
        </button>
      </div>
      <div style={{
        display: "flex", gap: 6, padding: "0 18px 14px",
        backgroundColor: c.bg,
        overflowX: "auto", flexShrink: 0, scrollbarWidth: "none",
      }}>
        {[{ id: "all", label: "Tout", icon: Layers }, ...["freight", "moving", "towing", "bus"].map(v => ({ id: v, label: t[v], icon: VERTICAL_CONFIGS[v].icon }))].map(tab => {
          const active = filter === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id} onClick={() => setFilter(tab.id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 999,
                backgroundColor: active ? c.text : c.surfaceAlt,
                color: active ? c.bg : c.textMuted,
                border: "none",
                fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em",
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                fontFamily: "inherit",
                transition: `background-color 200ms ${EASE_OUT}, color 200ms`,
              }}
            >
              <Icon size={14} strokeWidth={2.25} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <ScreenContainer c={c} bg={c.surface}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: c.textMuted }}>
            <Layers size={48} strokeWidth={1.5} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
            <div style={{ fontSize: 15, fontWeight: 700 }}>Aucune annonce pour l'instant</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Reviens dans quelques minutes</div>
          </div>
        )}
        {filtered.map(lead => (
          <LeadCard key={lead.id} lead={lead} c={c} t={t}
            onClick={() => navigate("driver_lead_detail", { leadId: lead.id })} />
        ))}
      </ScreenContainer>
    </>
  );
}
function ScreenDriverLeadDetail({ c, t, navigate, leads, params, balance, setBalance, onBuy }) {
  const lead = leads.find(l => l.id === params.leadId);
  const [bought, setBought] = useState(false);
  if (!lead) return <div style={{ padding: 20 }}>Lead introuvable</div>;
  const cfg = VERTICAL_CONFIGS[lead.vertical];
  const canAfford = balance >= lead.leadCostPoints;
  const handleBuy = () => {
    if (!canAfford) return;
    setBought(true);
    onBuy(lead);
    setTimeout(() => navigate("driver_lead_success", { leadId: lead.id }), 400);
  };
  const metaRow = (label, value, icon) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${c.borderSoft}` }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: 6 }}>
        {icon}{label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: c.text, textAlign: "right", maxWidth: "60%" }}>{value}</div>
    </div>
  );
  return (
    <>
      <TopBar c={c} title="Détails de l'annonce" onBack={() => navigate("driver_feed")} />
      <ScreenContainer c={c} bg={c.surface}>
        <div style={{
          backgroundColor: cfg.color, color: "#FFFFFF",
          border: `1px solid ${c.border}`, borderRadius: 16,
          boxShadow: c.shadowSm,
          padding: 20, marginBottom: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.04em" }}>Type de course</div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.01em", marginTop: 2 }}>{t[lead.vertical]}</div>
            </div>
            <UrgencyChip urgency={lead.urgency} c={c} t={t} />
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, fontWeight: 600 }}>
            <div><Clock size={12} style={{ display: "inline", marginRight: 4 }} />il y a {lead.postedMinAgo} min</div>
            <div><Navigation size={12} style={{ display: "inline", marginRight: 4 }} />{lead.distanceKm} {t.km}</div>
          </div>
        </div>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Trajet</div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: c.success, border: `1px solid ${c.border}` }} />
              <div style={{ width: 2, flex: 1, backgroundColor: c.text, margin: "4px 0", minHeight: 30 }} />
              <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: c.danger, border: `1px solid ${c.border}` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase" }}>Départ</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>{lead.pickupCity}</div>
                <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{lead.pickupAddress}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase" }}>Arrivée</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>{lead.dropoffCity}</div>
                <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{lead.dropoffAddress}</div>
              </div>
            </div>
          </div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Détails métier</div>
          {lead.vertical === "freight" && (
            <>
              {metaRow("Marchandise", `${lead.metadata.cargoType.icon} ${lead.metadata.cargoType.label}`)}
              {metaRow("Tonnage", lead.metadata.tonnage.label, <Hash size={12} />)}
              {metaRow("Type camion", lead.metadata.truckType.label, <Truck size={12} />)}
              {metaRow("Chargement", lead.metadata.loadingMethod)}
              {metaRow("Assurance", lead.metadata.insurance.label, <Shield size={12} />)}
            </>
          )}
          {lead.vertical === "moving" && (
            <>
              {metaRow("Logement", lead.metadata.propertyType.label, <Home size={12} />)}
              {metaRow("Étage départ", `${lead.metadata.floorFrom} ${lead.metadata.hasElevatorFrom ? "(asc. ✓)" : "(sans asc.)"}`)}
              {metaRow("Étage arrivée", `${lead.metadata.floorTo} ${lead.metadata.hasElevatorTo ? "(asc. ✓)" : "(sans asc.)"}`)}
              {lead.metadata.services.length > 0 && metaRow("Services demandés", lead.metadata.services.map(s => s.label).join(", "))}
            </>
          )}
          {lead.vertical === "towing" && (
            <>
              {metaRow("Véhicule", `${lead.metadata.vehicleType.icon} ${lead.metadata.vehicleType.label}`)}
              {metaRow("Panne", `${lead.metadata.breakdownType.icon} ${lead.metadata.breakdownType.label}`)}
              {metaRow("Localisation", `${lead.metadata.locationContext.icon} ${lead.metadata.locationContext.label}`)}
              {metaRow("État", `${lead.metadata.vehicleState.icon} ${lead.metadata.vehicleState.label}`)}
            </>
          )}
          {lead.vertical === "bus" && (
            <>
              {metaRow("Service", `${lead.metadata.serviceType.icon} ${lead.metadata.serviceType.label}`)}
              {metaRow("Capacité", lead.metadata.capacity.label, <Users size={12} />)}
              {metaRow("Durée", lead.metadata.duration, <Clock size={12} />)}
              {lead.metadata.amenities.length > 0 && metaRow("Équipements", lead.metadata.amenities.map(a => a.icon).join(" "))}
            </>
          )}
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>Client</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 999,
              backgroundColor: c.surfaceAlt, color: c.text,
              border: `1px solid ${c.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700,
            }}>{lead.clientFirstName[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>{lead.clientFirstName} {lead.clientLastName[0]}.</div>
              <div style={{ fontSize: 13, color: c.textMuted, fontFamily: "'SF Mono', monospace", letterSpacing: "0.02em" }}>
                {lead.clientPhoneMasked}
              </div>
            </div>
            <Lock size={20} color={c.textMuted} />
          </div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 20 }} accent={c.primary}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>Prix indicatif</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>{lead.estimatedPriceMin}-{lead.estimatedPriceMax} <span style={{ fontSize: 12, color: c.textMuted }}>{t.tnd}</span></div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" }}>Acheteurs</div>
              <BuyersIndicator count={lead.buyersCount} max={lead.maxBuyers} c={c} />
            </div>
          </div>
        </BrutCard>
        {!canAfford ? (
          <div style={{ padding: 16, backgroundColor: c.dangerBg, border: `2px solid ${c.danger}`, borderRadius: 12, marginBottom: 16, color: c.danger, fontSize: 14, fontWeight: 700, textAlign: "center" }}>
            Solde insuffisant. Tu as {balance} PTS, il faut {lead.leadCostPoints} PTS.
            <div style={{ marginTop: 10 }}>
              <BrutButton c={c} variant="primary" size="sm" onClick={() => navigate("driver_recharge")}>Recharger maintenant</BrutButton>
            </div>
          </div>
        ) : (
          <SwipeToBuy c={c} costPts={lead.leadCostPoints} label={t.swipe_to_buy} onComplete={handleBuy} />
        )}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenDriverLeadSuccess({ c, t, navigate, leads, params }) {
  const lead = leads.find(l => l.id === params.leadId);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const tm = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(tm);
  }, []);
  if (!lead) return null;
  const whatsappMsg = encodeURIComponent(`Bonjour ${lead.clientFirstName}, je suis Mohamed de ${"RELAYZ"}, concernant votre besoin de ${t[lead.vertical].toLowerCase()} de ${lead.pickupCity} à ${lead.dropoffCity}. Je peux vous aider.`);
  const whatsappLink = `https://wa.me/${lead.clientPhone.replace(/[^\d]/g, "")}?text=${whatsappMsg}`;
  return (
    <>
      <TopBar c={c} title="" onBack={() => navigate("driver_feed")} />
      <ScreenContainer c={c}>
        <div style={{ textAlign: "center", marginTop: 32, marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 96, height: 96, borderRadius: "50%",
            background: `linear-gradient(135deg, ${c.success} 0%, ${hexA(c.success, 0.75)} 100%)`,
            boxShadow: `0 12px 32px ${hexA(c.success, 0.30)}`,
            marginBottom: 20,
            animation: `scaleIn 500ms ${SPRING}`,
          }}>
            <AnimatedCheck size={56} color="#FFFFFF" strokeWidth={3.5} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{t.bought}</div>
          <div style={{ fontSize: 14, color: c.textMuted, marginTop: 6, fontWeight: 500 }}>Le contact client est débloqué</div>
        </div>
        <BrutCard c={c} style={{ marginBottom: 16 }} accent={c.primary}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>Contact client</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 999,
              backgroundColor: c.primary, color: c.primaryFg,
              border: `1px solid ${c.border}`,
              boxShadow: c.shadowSm,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700,
            }}>{lead.clientFirstName[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{lead.clientFirstName} {lead.clientLastName}</div>
              <div style={{
                fontSize: 18, fontWeight: 700, marginTop: 4,
                fontFamily: "'SF Mono', monospace",
                color: revealed ? c.text : c.textMuted,
                transition: "color 400ms",
              }}>
                {revealed ? lead.clientPhone : lead.clientPhoneMasked}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href={`tel:${lead.clientPhone.replace(/\s/g, "")}`} style={{ flex: 1, textDecoration: "none" }}>
              <BrutButton c={c} variant="dark" size="md" fullWidth icon={Phone}>
                {t.call_client}
              </BrutButton>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener" style={{ flex: 1, textDecoration: "none" }}>
              <BrutButton c={c} variant="success" size="md" fullWidth icon={MessageCircle}>
                {t.whatsapp_client}
              </BrutButton>
            </a>
          </div>
        </BrutCard>
        <BrutCard c={c} padding={14} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>Message WhatsApp pré-rempli</div>
          <div style={{ fontSize: 13, color: c.text, lineHeight: 1.5, padding: 12, backgroundColor: c.surfaceAlt, borderRadius: 10, fontStyle: "italic" }}>
            "Bonjour {lead.clientFirstName}, je suis Mohamed de RELAYZ, concernant votre besoin de {t[lead.vertical].toLowerCase()}..."
          </div>
        </BrutCard>
        <BrutButton c={c} variant="ghost" size="md" fullWidth onClick={() => navigate("driver_feed")}>
          {t.back_to_feed}
        </BrutButton>
      </ScreenContainer>
    </>
  );
}
function ScreenDriverWallet({ c, t, navigate, balance, transactions }) {
  const animatedBalance = useAnimatedNumber(balance, 800);
  return (
    <ScreenContainer c={c} bg={c.bg}>
      <div style={{
        padding: "28px 24px 24px", marginBottom: 20,
        background: `linear-gradient(135deg, ${c.primary} 0%, ${hexA(c.primary, 0.75)} 100%)`,
        color: "#FFFFFF",
        borderRadius: 24,
        boxShadow: `0 12px 32px ${hexA(c.primary, 0.30)}, 0 4px 8px ${hexA(c.primary, 0.20)}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -40, width: 200, height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.85, letterSpacing: "-0.005em" }}>{t.points_balance}</div>
        <div style={{
          fontSize: 52, fontWeight: 700, letterSpacing: "-0.04em",
          lineHeight: 1.05, marginTop: 6,
          fontVariantNumeric: "tabular-nums",
        }}>
          {animatedBalance}<span style={{ fontSize: 22, marginLeft: 8, opacity: 0.85, fontWeight: 500 }}>pts</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, opacity: 0.75, marginTop: 4 }}>
          ≈ {animatedBalance} {t.tnd}
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
          <button onClick={() => navigate("driver_recharge")} style={{
            padding: "10px 18px", borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.20)",
            color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.30)",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 6,
            backdropFilter: "blur(10px)",
            fontFamily: "inherit",
            transition: `background-color 200ms`,
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.30)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.20)"}>
            <Plus size={16} strokeWidth={2.5} />
            {t.recharge}
          </button>
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: c.textMuted, marginBottom: 12, marginLeft: 4 }}>
        Transactions récentes
      </div>
      <div style={{
        backgroundColor: c.card,
        borderRadius: 16, border: `1px solid ${c.border}`,
        boxShadow: c.shadowSm,
        marginBottom: 32, overflow: "hidden",
      }}>
        {transactions.slice(0, 10).map((tx, idx) => {
          const isPositive = tx.amount > 0;
          const iconMap = { purchase: Receipt, recharge: Plus, refund: RotateCcw, bonus: Sparkles };
          const Icon = iconMap[tx.type] || Receipt;
          return (
            <div key={tx.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px",
              borderBottom: idx < Math.min(transactions.length, 10) - 1 ? `1px solid ${c.borderSoft}` : "none",
              transition: "background-color 150ms",
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = c.surfaceAlt}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}>
              <div style={{
                width: 38, height: 38, borderRadius: 999,
                backgroundColor: isPositive ? c.successBg : c.surfaceAlt,
                color: isPositive ? c.success : c.textMuted,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={16} strokeWidth={2.25} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{tx.description}</div>
                <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>il y a {tx.hoursAgo}h</div>
              </div>
              <div style={{
                fontSize: 15, fontWeight: 600,
                color: isPositive ? c.success : c.text,
                fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em",
              }}>
                {isPositive ? "+" : ""}{tx.amount}
              </div>
            </div>
          );
        })}
      </div>
    </ScreenContainer>
  );
}
function ScreenDriverRecharge({ c, t, navigate, onRecharge }) {
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState(null);
  const amounts = [50, 100, 200, 500, 1000];
  const methods = [
    { id: "card", label: "Carte bancaire", desc: "Visa, Mastercard, e-Dinar", icon: CreditCard, instant: true },
    { id: "d17", label: "D17 Poste Tunisienne", desc: "Application D17", icon: Building2, instant: true },
    { id: "wafacash", label: "Wafacash", desc: "Agences cash partout", icon: Building, instant: false },
    { id: "transfer", label: "Virement bancaire", desc: "BIAT, Attijari, Amen", icon: Cash, instant: false },
  ];
  const handleRecharge = () => {
    onRecharge(amount);
    navigate("driver_wallet");
  };
  return (
    <>
      <TopBar c={c} title={t.recharge} onBack={() => navigate("driver_wallet")} />
      <ScreenContainer c={c}>
        <div style={{ fontSize: 13, fontWeight: 800, color: c.textMuted, marginBottom: 12 }}>
          Montant
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
          {amounts.map(a => (
            <button
              key={a} onClick={() => setAmount(a)}
              style={{
                padding: 16, fontSize: 17, fontWeight: 800,
                backgroundColor: amount === a ? c.primary : c.card,
                color: amount === a ? c.primaryFg : c.text,
                border: `1px solid ${c.border}`, borderRadius: 12,
                boxShadow: amount === a ? c.shadowSm : c.shadowSm,
                transform: amount === a ? "translate(2px, 2px)" : "translate(0,0)",
                transition: "all 150ms", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {a} <span style={{ fontSize: 11, opacity: 0.7 }}>{t.points}</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: c.textMuted, marginBottom: 12 }}>
          Méthode de paiement
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {methods.map(m => {
            const Icon = m.icon;
            const sel = method === m.id;
            return (
              <button
                key={m.id} onClick={() => setMethod(m.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: 14, textAlign: "left",
                  backgroundColor: sel ? c.text : c.card, color: sel ? c.bg : c.text,
                  border: `1px solid ${c.border}`, borderRadius: 12,
                  boxShadow: sel ? `0 4px 12px ${hexA(c.primary, 0.30)}` : c.shadowSm,
                  transform: sel ? "translate(2px, 2px)" : "translate(0,0)",
                  transition: "all 150ms", cursor: "pointer", fontFamily: "inherit", width: "100%",
                }}
              >
                <Icon size={24} strokeWidth={2.5} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{m.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{m.desc}</div>
                </div>
                {m.instant && (
                  <span style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: "0.04em",
                    padding: "3px 7px", borderRadius: 999,
                    backgroundColor: sel ? c.bg : c.successBg,
                    color: sel ? c.text : c.success,
                    border: `1px solid currentColor`,
                  }}>⚡ INSTANT</span>
                )}
              </button>
            );
          })}
        </div>
        <BrutButton c={c} variant="primary" size="lg" fullWidth disabled={!method}
          icon={Check} onClick={handleRecharge}>
          Recharger {amount} PTS
        </BrutButton>
      </ScreenContainer>
    </>
  );
}
function ScreenDriverHistory({ c, t, navigate, leads, bought }) {
  const myLeads = bought.map(id => leads.find(l => l.id === id)).filter(Boolean);
  return (
    <ScreenContainer c={c} bg={c.surface}>
      <div style={{ marginTop: 8, marginBottom: 16 }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{t.history}</div>
        <div style={{ fontSize: 13, color: c.textMuted, marginTop: 4 }}>{myLeads.length} annonce{myLeads.length > 1 ? "s" : ""} achetée{myLeads.length > 1 ? "s" : ""}</div>
      </div>
      {myLeads.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: c.textMuted }}>
          <History size={56} strokeWidth={1.5} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
          <div style={{ fontSize: 15, fontWeight: 700 }}>{t.history_empty}</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Tes annonces achetées apparaîtront ici</div>
        </div>
      ) : (
        myLeads.map(lead => (
          <LeadCard key={lead.id} lead={lead} c={c} t={t} onClick={() => navigate("driver_lead_success", { leadId: lead.id })} />
        ))
      )}
    </ScreenContainer>
  );
}
function ScreenDriverProfile({ c, t, navigate, prefs }) {
  const stats = [
    { label: "Annonces achetées", value: 47, icon: Receipt },
    { label: "Taux de réponse", value: "94%", icon: TrendingUp },
    { label: "Note moyenne", value: "4.7", icon: Star },
  ];
  return (
    <ScreenContainer c={c} bg={c.surface}>
      <div style={{
        backgroundColor: c.card, padding: 20, marginBottom: 16,
        border: `1px solid ${c.border}`, borderRadius: 16,
        boxShadow: c.shadowSm,
        textAlign: "center",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 999, margin: "0 auto 12px",
          backgroundColor: c.primary, color: c.primaryFg,
          border: `1.5px solid ${c.border}`,
          boxShadow: c.shadowSm,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, fontWeight: 700,
        }}>M</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Mohamed Ben Salah</div>
        <div style={{ fontSize: 13, color: c.textMuted, marginTop: 2 }}>+216 5X XXX XXX</div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8,
          padding: "4px 10px", borderRadius: 999,
          backgroundColor: c.warningBg, color: c.warning,
          border: `1.5px solid ${c.warning}`,
          fontSize: 11, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          <AlertCircle size={12} strokeWidth={3} />
          KYC en attente
        </div>
      </div>
      <BrutButton c={c} variant="primary" size="md" fullWidth icon={ShieldCheck} iconRight={ArrowRight}>
        Compléter ma vérification
      </BrutButton>
      <div style={{ height: 24 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{
              padding: 12, textAlign: "center",
              backgroundColor: c.card, border: `1px solid ${c.border}`,
              borderRadius: 12, boxShadow: c.shadowSm,
            }}>
              <Icon size={18} color={c.primary} strokeWidth={2.5} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: c.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.02em", marginTop: 2 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 13, fontWeight: 800, color: c.textMuted, marginBottom: 12 }}>
        Mes préférences
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Mes verticales", value: `${(prefs || []).length}/4 actives`, icon: Layers, action: () => navigate("driver_prefs") },
          { label: "Mon véhicule", value: "123 TUN 4567", icon: Truck },
          { label: "Zone d'activité", value: "Grand Tunis", icon: MapPin },
          { label: "Notifications", value: "Activées", icon: Bell },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} onClick={item.action} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
              backgroundColor: c.card, border: `1px solid ${c.border}`,
              borderRadius: 12, boxShadow: c.shadowSm,
              cursor: item.action ? "pointer" : "default",
            }}>
              <Icon size={20} color={c.textMuted} strokeWidth={2.5} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>{item.value}</div>
              </div>
              <ChevronRight size={18} color={c.textMuted} />
            </div>
          );
        })}
      </div>
      <BrutButton c={c} variant="ghost" size="md" fullWidth icon={LogOut}>
        Se déconnecter
      </BrutButton>
      <div style={{ height: 20 }} />
    </ScreenContainer>
  );
}
function ScreenClientHome({ c, t, brand, navigate }) {
  const verticals = ["freight", "moving", "towing", "bus"];
  return (
    <>
      <TopBar c={c} title="" onBack={() => navigate("splash")} />
      <ScreenContainer c={c}>
        <div style={{ marginTop: 8, marginBottom: 28 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {t.what_you_need}
          </div>
          <div style={{ fontSize: 14, color: c.textMuted, marginTop: 8 }}>
            Choisissez votre type de transport
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {verticals.map(v => {
            const cfg = VERTICAL_CONFIGS[v];
            const Icon = cfg.icon;
            const formScreens = {
              freight: "client_form_freight",
              moving: "client_form_moving",
              towing: "client_form_towing",
              bus: "client_form_bus",
            };
            return (
              <div
                key={v}
                onClick={() => navigate(formScreens[v])}
                style={{
                  backgroundColor: cfg.color, color: "#FFFFFF",
                  border: `1px solid ${c.border}`, borderRadius: 16,
                  boxShadow: c.shadowSm,
                  padding: 20, cursor: "pointer",
                  minHeight: 160, display: "flex", flexDirection: "column",
                  transition: "all 150ms",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  border: `2px solid #FFFFFF`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "auto",
                }}>
                  <Icon size={28} strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginTop: 16 }}>{t[v]}</div>
                <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.9, marginTop: 4 }}>{t[v + "_desc"]}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 24, padding: 16, backgroundColor: c.surface, borderRadius: 14, border: `1px solid ${c.borderSoft}` }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 24 }}>⚡</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Réponse en 5 minutes</div>
              <div style={{ fontSize: 12, color: c.textMuted, marginTop: 4, lineHeight: 1.5 }}>
                Jusqu'à 5 chauffeurs vous contactent directement avec leur offre.
              </div>
            </div>
          </div>
        </div>
      </ScreenContainer>
    </>
  );
}
function FormStepHeader({ c, t, step, totalSteps, title, subtitle }) {
  return (
    <div style={{ marginTop: 8, marginBottom: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>
        {t.step} {step}/{totalSteps}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 999,
            backgroundColor: i < step ? c.primary : c.borderSoft,
            border: i < step ? `1px solid ${c.border}` : "none",
            transition: "all 300ms",
          }} />
        ))}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: c.textMuted, marginTop: 6 }}>{subtitle}</div>}
    </div>
  );
}
function ScreenClientFormFreight({ c, t, navigate, formData, setFormData }) {
  const [step, setStep] = useState(1);
  const TOTAL = 4;
  const update = (k, v) => setFormData({ ...formData, [k]: v });
  const stepValid = () => {
    if (step === 1) return formData.pickupCity && formData.dropoffCity;
    if (step === 2) return formData.cargoType && formData.tonnage && formData.truckType;
    if (step === 3) return formData.urgency;
    return true;
  };
  return (
    <>
      <TopBar c={c} title={t.freight} onBack={() => step === 1 ? navigate("client_home") : setStep(step - 1)} />
      <ScreenContainer c={c}>
        {step === 1 && (
          <>
            <FormStepHeader c={c} t={t} step={1} totalSteps={TOTAL} title="Trajet" subtitle="D'où à où ?" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <BrutSelect c={c} label={t.pickup_location} options={TUNISIAN_CITIES}
                value={formData.pickupCity} onChange={v => update("pickupCity", v)} />
              <BrutInput c={c} label="Adresse de chargement"
                value={formData.pickupAddress || ""} onChange={v => update("pickupAddress", v)}
                placeholder="Quartier, rue..." />
              <BrutSelect c={c} label={t.dropoff_location} options={TUNISIAN_CITIES}
                value={formData.dropoffCity} onChange={v => update("dropoffCity", v)} />
              <BrutInput c={c} label="Adresse de déchargement"
                value={formData.dropoffAddress || ""} onChange={v => update("dropoffAddress", v)}
                placeholder="Quartier, rue..." />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <FormStepHeader c={c} t={t} step={2} totalSteps={TOTAL} title="Marchandise" subtitle="Détails du chargement" />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Type de marchandise</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.freight.cargoTypes} value={formData.cargoType} onChange={v => update("cargoType", v)} columns={2} />
            <div style={{ height: 20 }} />
            <BrutSelect c={c} label="Tonnage estimé" options={VERTICAL_CONFIGS.freight.tonnages}
              value={formData.tonnage} onChange={v => update("tonnage", v)} />
            <div style={{ height: 20 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Type de camion souhaité</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.freight.truckTypes} value={formData.truckType} onChange={v => update("truckType", v)} columns={2} />
            <div style={{ height: 20 }} />
            <BrutSelect c={c} label="Méthode de chargement" options={VERTICAL_CONFIGS.freight.loadingMethods}
              value={formData.loadingMethod} onChange={v => update("loadingMethod", v)} />
          </>
        )}
        {step === 3 && (
          <>
            <FormStepHeader c={c} t={t} step={3} totalSteps={TOTAL} title="Délai" subtitle="Quand avez-vous besoin ?" />
            <BrutGridChoice c={c} options={[
              { id: "immediate", label: t.immediate, icon: "🚨", desc: "Maintenant" },
              { id: "today", label: t.today, icon: "⏰", desc: "Aujourd'hui" },
              { id: "this_week", label: t.this_week, icon: "📅", desc: "Sous 7 jours" },
              { id: "flexible", label: t.flexible, icon: "💚", desc: "Pas pressé" },
            ]} value={formData.urgency} onChange={v => update("urgency", v)} columns={2} />
            <div style={{ height: 24 }} />
            <BrutSelect c={c} label="Fréquence" options={VERTICAL_CONFIGS.freight.frequencies}
              value={formData.frequency} onChange={v => update("frequency", v)} placeholder="Course unique par défaut" />
          </>
        )}
        {step === 4 && (
          <>
            <FormStepHeader c={c} t={t} step={4} totalSteps={TOTAL} title="Options" subtitle="Détails complémentaires (optionnel)" />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Niveau d'assurance</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.freight.insuranceLevels} value={formData.insurance} onChange={v => update("insurance", v)} columns={2} />
            <div style={{ height: 20 }} />
            <BrutInput c={c} label="Description libre (optionnel)"
              value={formData.description || ""} onChange={v => update("description", v)}
              placeholder="Précisions sur la marchandise..." />
            <div style={{ height: 20 }} />
            <BrutInput c={c} label="Numéro de téléphone" prefix="+216"
              value={formData.phone || ""} onChange={v => update("phone", v.replace(/[^\d\s]/g, ""))} />
          </>
        )}
        <div style={{ height: 24 }} />
        {step < TOTAL ? (
          <BrutButton c={c} variant="primary" size="lg" fullWidth disabled={!stepValid()} iconRight={ArrowRight}
            onClick={() => setStep(step + 1)}>{t.next}</BrutButton>
        ) : (
          <BrutButton c={c} variant="primary" size="lg" fullWidth icon={Check}
            onClick={() => navigate("client_recap", { vertical: "freight" })}>{t.publish}</BrutButton>
        )}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenClientFormMoving({ c, t, navigate, formData, setFormData }) {
  const [step, setStep] = useState(1);
  const TOTAL = 4;
  const update = (k, v) => setFormData({ ...formData, [k]: v });
  const stepValid = () => {
    if (step === 1) return formData.propertyType;
    if (step === 2) return formData.pickupCity && formData.dropoffCity;
    if (step === 3) return formData.urgency;
    return true;
  };
  return (
    <>
      <TopBar c={c} title={t.moving} onBack={() => step === 1 ? navigate("client_home") : setStep(step - 1)} />
      <ScreenContainer c={c}>
        {step === 1 && (
          <>
            <FormStepHeader c={c} t={t} step={1} totalSteps={TOTAL} title="Logement" subtitle="Qu'est-ce qui déménage ?" />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Type de logement</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.moving.propertyTypes} value={formData.propertyType} onChange={v => update("propertyType", v)} columns={2} />
          </>
        )}
        {step === 2 && (
          <>
            <FormStepHeader c={c} t={t} step={2} totalSteps={TOTAL} title="Adresses" subtitle="Départ et arrivée" />
            <BrutSelect c={c} label={t.pickup_location} options={TUNISIAN_CITIES}
              value={formData.pickupCity} onChange={v => update("pickupCity", v)} />
            <div style={{ height: 12 }} />
            <BrutSelect c={c} label="Étage de départ" options={VERTICAL_CONFIGS.moving.floorOptions}
              value={formData.floorFrom} onChange={v => update("floorFrom", v)} />
            <div style={{ height: 12 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, backgroundColor: c.surface, borderRadius: 10, marginBottom: 16, border: `1px solid ${c.borderSoft}` }}>
              <input type="checkbox" checked={formData.hasElevatorFrom || false} onChange={e => update("hasElevatorFrom", e.target.checked)} style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Ascenseur disponible au départ</span>
            </div>
            <BrutSelect c={c} label={t.dropoff_location} options={TUNISIAN_CITIES}
              value={formData.dropoffCity} onChange={v => update("dropoffCity", v)} />
            <div style={{ height: 12 }} />
            <BrutSelect c={c} label="Étage d'arrivée" options={VERTICAL_CONFIGS.moving.floorOptions}
              value={formData.floorTo} onChange={v => update("floorTo", v)} />
            <div style={{ height: 12 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, backgroundColor: c.surface, borderRadius: 10, border: `1px solid ${c.borderSoft}` }}>
              <input type="checkbox" checked={formData.hasElevatorTo || false} onChange={e => update("hasElevatorTo", e.target.checked)} style={{ width: 18, height: 18 }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Ascenseur disponible à l'arrivée</span>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <FormStepHeader c={c} t={t} step={3} totalSteps={TOTAL} title="Date" subtitle="Quand voulez-vous déménager ?" />
            <BrutGridChoice c={c} options={[
              { id: "immediate", label: t.immediate, icon: "🚨", desc: "Cette semaine" },
              { id: "today", label: "Date précise", icon: "📅", desc: "Date fixe" },
              { id: "this_week", label: t.this_week, icon: "⏰", desc: "Dans 7 jours" },
              { id: "flexible", label: t.flexible, icon: "💚", desc: "Pas pressé" },
            ]} value={formData.urgency} onChange={v => update("urgency", v)} columns={2} />
            <div style={{ height: 20 }} />
            <BrutSelect c={c} label="Flexibilité" options={VERTICAL_CONFIGS.moving.flexibility}
              value={formData.flexibility} onChange={v => update("flexibility", v)} placeholder="Sélectionner..." />
          </>
        )}
        {step === 4 && (
          <>
            <FormStepHeader c={c} t={t} step={4} totalSteps={TOTAL} title="Services" subtitle="Cochez ce dont vous avez besoin (optionnel)" />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Services additionnels</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.moving.additionalServices} value={formData.services} onChange={v => update("services", v)} columns={2} multi />
            <div style={{ height: 20 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Objets spéciaux</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.moving.specialItems} value={formData.specialItems} onChange={v => update("specialItems", v)} columns={2} multi />
            <div style={{ height: 20 }} />
            <BrutInput c={c} label="Numéro de téléphone" prefix="+216"
              value={formData.phone || ""} onChange={v => update("phone", v.replace(/[^\d\s]/g, ""))} />
          </>
        )}
        <div style={{ height: 24 }} />
        {step < TOTAL ? (
          <BrutButton c={c} variant="primary" size="lg" fullWidth disabled={!stepValid()} iconRight={ArrowRight}
            onClick={() => setStep(step + 1)}>{t.next}</BrutButton>
        ) : (
          <BrutButton c={c} variant="primary" size="lg" fullWidth icon={Check}
            onClick={() => navigate("client_recap", { vertical: "moving" })}>{t.publish}</BrutButton>
        )}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenClientFormTowing({ c, t, navigate, formData, setFormData }) {
  const update = (k, v) => setFormData({ ...formData, [k]: v });
  const valid = formData.vehicleType && formData.breakdownType && formData.locationContext && formData.pickupAddress;
  return (
    <>
      <TopBar c={c} title={t.towing} onBack={() => navigate("client_home")} />
      <ScreenContainer c={c}>
        <div style={{
          padding: 14, marginBottom: 20,
          backgroundColor: c.dangerBg, color: c.danger,
          border: `2px solid ${c.danger}`, borderRadius: 12,
          display: "flex", gap: 10, alignItems: "center",
        }}>
          <AlertCircle size={24} strokeWidth={2.5} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>URGENCE PANNE</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>Réponse en moins de 5 minutes</div>
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Type de véhicule</div>
        <BrutGridChoice c={c} options={VERTICAL_CONFIGS.towing.vehicleTypes} value={formData.vehicleType} onChange={v => update("vehicleType", v)} columns={2} />
        <div style={{ height: 20 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Type de panne</div>
        <BrutGridChoice c={c} options={VERTICAL_CONFIGS.towing.breakdownTypes} value={formData.breakdownType} onChange={v => update("breakdownType", v)} columns={2} />
        <div style={{ height: 20 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Où êtes-vous ?</div>
        <BrutGridChoice c={c} options={VERTICAL_CONFIGS.towing.locationContext} value={formData.locationContext} onChange={v => update("locationContext", v)} columns={2} />
        <div style={{ height: 20 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>État du véhicule</div>
        <BrutGridChoice c={c} options={VERTICAL_CONFIGS.towing.vehicleState} value={formData.vehicleState} onChange={v => update("vehicleState", v)} columns={2} />
        <div style={{ height: 20 }} />
        <BrutInput c={c} label="Adresse précise (ou point GPS)"
          value={formData.pickupAddress || ""} onChange={v => update("pickupAddress", v)}
          placeholder="Ex: Autoroute A1, sortie 12, sens Tunis-Sousse" />
        <div style={{ height: 12 }} />
        <BrutButton c={c} variant="ghost" size="sm" icon={MapPin}>
          📍 Utiliser ma position GPS actuelle
        </BrutButton>
        <div style={{ height: 20 }} />
        <BrutSelect c={c} label="Destination souhaitée" options={VERTICAL_CONFIGS.towing.destinationTypes}
          value={formData.destinationType} onChange={v => update("destinationType", v)} placeholder="Où ramener le véhicule ?" />
        <div style={{ height: 20 }} />
        <BrutInput c={c} label="Numéro de téléphone" prefix="+216"
          value={formData.phone || ""} onChange={v => update("phone", v.replace(/[^\d\s]/g, ""))} />
        <div style={{ height: 24 }} />
        <BrutButton c={c} variant="danger" size="lg" fullWidth disabled={!valid} icon={Zap}
          onClick={() => navigate("client_recap", { vertical: "towing" })}>
          PUBLIER EN URGENCE
        </BrutButton>
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenClientFormBus({ c, t, navigate, formData, setFormData }) {
  const [step, setStep] = useState(1);
  const TOTAL = 4;
  const update = (k, v) => setFormData({ ...formData, [k]: v });
  const stepValid = () => {
    if (step === 1) return formData.serviceType;
    if (step === 2) return formData.capacity && formData.duration;
    if (step === 3) return formData.pickupCity && formData.dropoffCity;
    return true;
  };
  return (
    <>
      <TopBar c={c} title={t.bus} onBack={() => step === 1 ? navigate("client_home") : setStep(step - 1)} />
      <ScreenContainer c={c}>
        {step === 1 && (
          <>
            <FormStepHeader c={c} t={t} step={1} totalSteps={TOTAL} title="Type de service" subtitle="Pour quelle occasion ?" />
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.bus.serviceTypes} value={formData.serviceType} onChange={v => update("serviceType", v)} columns={2} />
          </>
        )}
        {step === 2 && (
          <>
            <FormStepHeader c={c} t={t} step={2} totalSteps={TOTAL} title="Capacité & durée" subtitle="Combien de personnes, combien de temps ?" />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Capacité</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.bus.capacities} value={formData.capacity} onChange={v => update("capacity", v)} columns={1} />
            <div style={{ height: 20 }} />
            <BrutSelect c={c} label="Durée" options={VERTICAL_CONFIGS.bus.duration}
              value={formData.duration} onChange={v => update("duration", v)} />
            <div style={{ height: 16 }} />
            <BrutSelect c={c} label="Nombre de chauffeurs" options={VERTICAL_CONFIGS.bus.driverOptions}
              value={formData.driverCount} onChange={v => update("driverCount", v)} placeholder="1 par défaut" />
          </>
        )}
        {step === 3 && (
          <>
            <FormStepHeader c={c} t={t} step={3} totalSteps={TOTAL} title="Trajet" subtitle="Lieu de départ et destination" />
            <BrutSelect c={c} label={t.pickup_location} options={TUNISIAN_CITIES}
              value={formData.pickupCity} onChange={v => update("pickupCity", v)} />
            <div style={{ height: 12 }} />
            <BrutInput c={c} label="Point de rendez-vous précis"
              value={formData.pickupAddress || ""} onChange={v => update("pickupAddress", v)} placeholder="Ex: Devant l'école..." />
            <div style={{ height: 16 }} />
            <BrutSelect c={c} label={t.dropoff_location} options={TUNISIAN_CITIES}
              value={formData.dropoffCity} onChange={v => update("dropoffCity", v)} />
            <div style={{ height: 12 }} />
            <BrutInput c={c} label="Adresse de destination"
              value={formData.dropoffAddress || ""} onChange={v => update("dropoffAddress", v)} placeholder="Ex: Hôtel Laico..." />
          </>
        )}
        {step === 4 && (
          <>
            <FormStepHeader c={c} t={t} step={4} totalSteps={TOTAL} title="Équipements" subtitle="Préférences (optionnel)" />
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textMuted, marginBottom: 8, letterSpacing: "0.02em" }}>Équipements souhaités</div>
            <BrutGridChoice c={c} options={VERTICAL_CONFIGS.bus.amenities} value={formData.amenities} onChange={v => update("amenities", v)} columns={2} multi />
            <div style={{ height: 20 }} />
            <BrutInput c={c} label="Description / besoins spécifiques"
              value={formData.description || ""} onChange={v => update("description", v)}
              placeholder="Ex: voyage scolaire, prévoir collations..." />
            <div style={{ height: 16 }} />
            <BrutInput c={c} label="Numéro de téléphone" prefix="+216"
              value={formData.phone || ""} onChange={v => update("phone", v.replace(/[^\d\s]/g, ""))} />
          </>
        )}
        <div style={{ height: 24 }} />
        {step < TOTAL ? (
          <BrutButton c={c} variant="primary" size="lg" fullWidth disabled={!stepValid()} iconRight={ArrowRight}
            onClick={() => setStep(step + 1)}>{t.next}</BrutButton>
        ) : (
          <BrutButton c={c} variant="primary" size="lg" fullWidth icon={Check}
            onClick={() => navigate("client_recap", { vertical: "bus" })}>{t.publish}</BrutButton>
        )}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenClientRecap({ c, t, navigate, formData, params }) {
  const vertical = params.vertical;
  const cfg = VERTICAL_CONFIGS[vertical];
  const Icon = cfg.icon;
  const summaryRow = (label, value) => value ? (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${c.borderSoft}`, gap: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, letterSpacing: "0.02em" }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{value}</div>
    </div>
  ) : null;
  return (
    <>
      <TopBar c={c} title="Récapitulatif" onBack={() => navigate(-1)} />
      <ScreenContainer c={c}>
        <div style={{
          padding: 18, marginBottom: 20,
          backgroundColor: cfg.color, color: "#FFFFFF",
          border: `1px solid ${c.border}`, borderRadius: 16,
          boxShadow: c.shadowSm,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            backgroundColor: "rgba(255,255,255,0.2)",
            border: `2px solid #FFFFFF`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={30} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.9, letterSpacing: "0.02em" }}>Votre demande</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{t[vertical]}</div>
          </div>
        </div>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          {summaryRow("Départ", formData.pickupCity)}
          {summaryRow("Arrivée", formData.dropoffCity)}
          {formData.pickupAddress && summaryRow("Adresse départ", formData.pickupAddress)}
          {formData.dropoffAddress && summaryRow("Adresse arrivée", formData.dropoffAddress)}
          {vertical === "freight" && <>
            {formData.cargoType && summaryRow("Marchandise", `${formData.cargoType.icon} ${formData.cargoType.label}`)}
            {formData.tonnage && summaryRow("Tonnage", formData.tonnage.label)}
            {formData.truckType && summaryRow("Camion", formData.truckType.label)}
            {formData.loadingMethod && summaryRow("Chargement", formData.loadingMethod)}
            {formData.insurance && summaryRow("Assurance", formData.insurance.label)}
            {formData.frequency && summaryRow("Fréquence", formData.frequency)}
          </>}
          {vertical === "moving" && <>
            {formData.propertyType && summaryRow("Logement", formData.propertyType.label)}
            {formData.floorFrom && summaryRow("Étage départ", `${formData.floorFrom}${formData.hasElevatorFrom ? " · asc. ✓" : ""}`)}
            {formData.floorTo && summaryRow("Étage arrivée", `${formData.floorTo}${formData.hasElevatorTo ? " · asc. ✓" : ""}`)}
            {formData.services?.length > 0 && summaryRow("Services", `${formData.services.length} sélectionnés`)}
            {formData.specialItems?.length > 0 && summaryRow("Objets spéciaux", `${formData.specialItems.length} sélectionnés`)}
          </>}
          {vertical === "towing" && <>
            {formData.vehicleType && summaryRow("Véhicule", `${formData.vehicleType.icon} ${formData.vehicleType.label}`)}
            {formData.breakdownType && summaryRow("Panne", `${formData.breakdownType.icon} ${formData.breakdownType.label}`)}
            {formData.locationContext && summaryRow("Lieu", `${formData.locationContext.icon} ${formData.locationContext.label}`)}
            {formData.vehicleState && summaryRow("État", `${formData.vehicleState.icon} ${formData.vehicleState.label}`)}
            {formData.destinationType && summaryRow("Destination", formData.destinationType.label)}
          </>}
          {vertical === "bus" && <>
            {formData.serviceType && summaryRow("Service", `${formData.serviceType.icon} ${formData.serviceType.label}`)}
            {formData.capacity && summaryRow("Capacité", formData.capacity.label)}
            {formData.duration && summaryRow("Durée", formData.duration)}
            {formData.amenities?.length > 0 && summaryRow("Équipements", formData.amenities.map(a => a.icon).join(" "))}
          </>}
          {formData.urgency && summaryRow("Délai", t[formData.urgency])}
          {formData.description && summaryRow("Description", formData.description)}
          {formData.phone && summaryRow("Téléphone", `+216 ${formData.phone}`)}
        </BrutCard>
        <div style={{
          padding: 14, marginBottom: 20,
          backgroundColor: c.infoBg, color: c.info,
          border: `2px solid ${c.info}`, borderRadius: 12,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Sparkles size={20} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>
            En publiant, votre annonce sera vue par tous les chauffeurs disponibles. Vous recevrez jusqu'à 5 propositions.
          </div>
        </div>
        <BrutButton c={c} variant="primary" size="lg" fullWidth icon={Send}
          onClick={() => navigate("client_otp", { phone: `+216 ${formData.phone || "XX XXX XXX"}`, nextScreen: "client_publishing", vertical })}>
          {t.publish}
        </BrutButton>
        <div style={{ height: 12 }} />
        <BrutButton c={c} variant="ghost" size="md" fullWidth onClick={() => navigate(-1)}>
          Modifier
        </BrutButton>
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenClientPublishing({ c, t, navigate, params }) {
  const [phase, setPhase] = useState(0);
  const phases = [
    "📡 Diffusion à tous les chauffeurs...",
    "🎯 Recherche dans votre zone...",
    "⚡ Activation des notifications...",
    "✓ Annonce en ligne !",
  ];
  useEffect(() => {
    const timers = phases.map((_, i) => setTimeout(() => setPhase(i + 1), (i + 1) * 700));
    const finalT = setTimeout(() => navigate("client_tracking", params), phases.length * 700 + 800);
    return () => { timers.forEach(clearTimeout); clearTimeout(finalT); };
  }, []);
  return (
    <ScreenContainer c={c} padding={32}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          backgroundColor: c.primary, color: c.primaryFg,
          border: `1.5px solid ${c.border}`, boxShadow: c.shadowSm,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32, fontSize: 56,
          animation: "pulse 1.4s ease-in-out infinite",
        }}>📡</div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8, textAlign: "center" }}>
          {phase >= phases.length ? "C'est parti !" : "Publication en cours..."}
        </div>
        <div style={{ width: "100%", maxWidth: 320, marginTop: 16 }}>
          {phases.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", marginBottom: 8,
              backgroundColor: i < phase ? c.successBg : c.surface,
              color: i < phase ? c.success : c.textMuted,
              border: `1.5px solid ${i < phase ? c.success : c.borderSoft}`,
              borderRadius: 10,
              fontSize: 13, fontWeight: 700,
              opacity: i > phase ? 0.5 : 1,
              transition: "all 300ms",
            }}>
              {i < phase ? <Check size={16} strokeWidth={3} /> : <Loader2 size={16} className="spin" />}
              {p}
            </div>
          ))}
        </div>
      </div>
    </ScreenContainer>
  );
}
function ScreenClientTracking({ c, t, navigate, params }) {
  const [count, setCount] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const cfg = VERTICAL_CONFIGS[params.vertical];
  useEffect(() => {
    const allDrivers = generateDriversForLead(5, 5);
    const timers = allDrivers.map((d, i) => setTimeout(() => {
      setDrivers(prev => [...prev, d]);
      setCount(prev => prev + 1);
      if (navigator.vibrate) navigator.vibrate(40);
    }, (i + 1) * 1800));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <>
      <TopBar c={c} title="Suivi de votre annonce" onBack={() => navigate("client_home")} />
      <ScreenContainer c={c} bg={c.surface}>
        <div style={{
          padding: 20, marginBottom: 20,
          background: `linear-gradient(135deg, ${cfg.color} 0%, ${cfg.color}dd 100%)`,
          color: "#FFFFFF",
          border: `1px solid ${c.border}`, borderRadius: 16,
          boxShadow: c.shadowSm,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", opacity: 0.9 }}>En direct</div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, marginTop: 6 }}>{count}</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{t.interested_drivers}</div>
          {count < 5 && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12,
              padding: "6px 12px", borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.2)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: "#22C55E", animation: "pulse 1s infinite" }} />
              En attente d'autres offres
            </div>
          )}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: 12, marginBottom: 16,
          backgroundColor: c.warningBg, color: c.warning,
          border: `1.5px solid ${c.warning}`, borderRadius: 10,
        }}>
          <Clock size={18} strokeWidth={2.5} />
          <div style={{ fontSize: 13, fontWeight: 700 }}>{t.expires_in} 5h 47min</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: c.textMuted, marginBottom: 12 }}>
          Offres reçues
        </div>
        {drivers.length === 0 && (
          <div style={{ textAlign: "center", padding: 32, color: c.textMuted }}>
            <Loader2 size={32} className="spin" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 13, fontWeight: 600 }}>Recherche des chauffeurs disponibles...</div>
          </div>
        )}
        {drivers.map((d, i) => (
          <div key={d.id} style={{
            backgroundColor: c.card, padding: 14, marginBottom: 10,
            border: `1px solid ${c.border}`, borderRadius: 12,
            boxShadow: c.shadowSm,
            animation: "scaleIn 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            display: "flex", gap: 12, alignItems: "center",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 999,
              backgroundColor: c.primary, color: c.primaryFg,
              border: `1px solid ${c.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, flexShrink: 0,
            }}>{d.firstName[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 800 }}>{d.firstName}</span>
                <Star size={12} fill={c.warning} color={c.warning} />
                <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{d.rating}</span>
                <span style={{ fontSize: 11, color: c.textMuted }}>({d.totalTrips})</span>
              </div>
              <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>
                {d.vehicleType} · à {d.distanceKm} km
              </div>
            </div>
            <a href={`tel:${d.phone.replace(/\s/g, "")}`} style={{ textDecoration: "none" }}>
              <button style={{
                padding: "8px 12px",
                backgroundColor: c.success, color: "#FFFFFF",
                border: `1px solid ${c.border}`, borderRadius: 10,
                boxShadow: c.shadowSm,
                fontSize: 12, fontWeight: 800, letterSpacing: "0.03em",
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: "inherit",
              }}>
                <Phone size={12} strokeWidth={2.5} />
                Contacter
              </button>
            </a>
          </div>
        ))}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenAdminDashboard({ c, t, navigate, leads, brand }) {
  const kpis = [
    { label: t.active_leads, value: leads.filter(l => l.status === "available").length, delta: "+12%", icon: Layers, color: c.info },
    { label: t.online_drivers, value: 247, delta: "+8%", icon: Users, color: c.success },
    { label: t.transactions_today, value: 89, delta: "+23%", icon: Activity, color: c.primary },
    { label: t.revenue_today, value: "1 247", suffix: "TND", delta: "+18%", icon: TrendingUp, color: c.warning },
  ];
  const chartData = Array.from({ length: 24 }).map((_, i) => ({
    h: i,
    leads: Math.floor(Math.random() * 30) + 5 + (i > 8 && i < 20 ? 15 : 0),
    transactions: Math.floor(Math.random() * 15) + 2 + (i > 8 && i < 20 ? 8 : 0),
  }));
  const verticalDist = [
    { name: t.freight, value: leads.filter(l => l.vertical === "freight").length, color: VERTICAL_CONFIGS.freight.color },
    { name: t.moving, value: leads.filter(l => l.vertical === "moving").length, color: VERTICAL_CONFIGS.moving.color },
    { name: t.towing, value: leads.filter(l => l.vertical === "towing").length, color: VERTICAL_CONFIGS.towing.color },
    { name: t.bus, value: leads.filter(l => l.vertical === "bus").length, color: VERTICAL_CONFIGS.bus.color },
  ];
  return (
    <>
      <div style={{
        padding: "14px 18px",
        backgroundColor: c.text, color: c.bg,
        borderBottom: `2px solid ${c.border}`,
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          backgroundColor: c.primary, color: c.primaryFg,
          border: `1.5px solid ${c.bg}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700,
        }}>{brand.logoEmoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>Console Admin</div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>{brand.name}</div>
        </div>
        <button onClick={() => navigate("splash")} style={{
          padding: "6px 10px", border: `1.5px solid ${c.bg}`, borderRadius: 8,
          backgroundColor: "transparent", color: c.bg, fontSize: 11, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.02em", cursor: "pointer",
          fontFamily: "inherit",
        }}>Sortie</button>
      </div>
      <ScreenContainer c={c} bg={c.surface}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {kpis.map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} style={{
                backgroundColor: c.card, padding: 14,
                border: `1px solid ${c.border}`, borderRadius: 14,
                boxShadow: c.shadowSm,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: kpi.color, color: "#FFFFFF",
                    border: `1.5px solid ${c.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 800, color: c.success,
                    padding: "2px 6px", backgroundColor: c.successBg, borderRadius: 999,
                    border: `1px solid ${c.success}`,
                  }}>{kpi.delta}</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {kpi.value}{kpi.suffix && <span style={{ fontSize: 11, marginLeft: 4, color: c.textMuted }}>{kpi.suffix}</span>}
                </div>
                <div style={{ fontSize: 10, color: c.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginTop: 4 }}>
                  {kpi.label}
                </div>
              </div>
            );
          })}
        </div>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.02em", marginBottom: 12 }}>
            Activité dernières 24h
          </div>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.primary} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={c.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="h" stroke={c.textMuted} fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: c.card, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="leads" stroke={c.primary} strokeWidth={2.5} fill="url(#grad1)" />
                <Line type="monotone" dataKey="transactions" stroke={c.info} strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 11, fontWeight: 700 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, backgroundColor: c.primary, borderRadius: 2 }} /> Annonces
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 10, height: 10, backgroundColor: c.info, borderRadius: 2 }} /> Transactions
            </div>
          </div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.02em", marginBottom: 12 }}>
            Répartition par verticale
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 120, height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={verticalDist} dataKey="value" innerRadius={32} outerRadius={56} strokeWidth={2} stroke={c.border}>
                    {verticalDist.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ flex: 1 }}>
              {verticalDist.map(d => (
                <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${c.borderSoft}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, backgroundColor: d.color, borderRadius: 2, border: `1px solid ${c.border}` }} />
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800 }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </BrutCard>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <BrutCard c={c} onClick={() => navigate("admin_leads")} padding={14}>
            <Layers size={20} color={c.primary} strokeWidth={2.5} />
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 8 }}>{t.leads}</div>
            <div style={{ fontSize: 11, color: c.textMuted }}>Voir toutes les annonces →</div>
          </BrutCard>
          <BrutCard c={c} onClick={() => navigate("admin_drivers")} padding={14}>
            <Users size={20} color={c.success} strokeWidth={2.5} />
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 8 }}>{t.drivers}</div>
            <div style={{ fontSize: 11, color: c.textMuted }}>Gérer les chauffeurs →</div>
          </BrutCard>
        </div>
        <BrutCard c={c} onClick={() => navigate("style_guide")} padding={14} style={{ marginBottom: 16 }} accent={c.primary}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Palette size={20} color={c.primary} strokeWidth={2.5} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800 }}>Style Guide</div>
              <div style={{ fontSize: 11, color: c.textMuted }}>Palette + composants pour le tech lead</div>
            </div>
            <ChevronRight size={18} color={c.textMuted} />
          </div>
        </BrutCard>
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenAdminLeads({ c, t, navigate, leads }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? leads : leads.filter(l => l.vertical === filter);
  return (
    <>
      <TopBar c={c} title={t.leads} onBack={() => navigate("admin_dashboard")} />
      <ScreenContainer c={c} bg={c.surface}>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", scrollbarWidth: "none" }}>
          {["all", "freight", "moving", "towing", "bus"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
              backgroundColor: filter === f ? c.text : c.card,
              color: filter === f ? c.bg : c.text,
              border: `1.5px solid ${c.border}`, cursor: "pointer", flexShrink: 0,
              textTransform: "uppercase", letterSpacing: "0.02em",
              fontFamily: "inherit",
            }}>
              {f === "all" ? "Tout" : t[f]}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.02em" }}>
          {filtered.length} annonces · {filtered.filter(l => l.status === "available").length} actives
        </div>
        {filtered.slice(0, 15).map(lead => {
          const cfg = VERTICAL_CONFIGS[lead.vertical];
          const Icon = cfg.icon;
          return (
            <div key={lead.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: 12, marginBottom: 8,
              backgroundColor: c.card,
              border: `1.5px solid ${c.border}`, borderRadius: 10,
              boxShadow: c.shadowSm,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                backgroundColor: cfg.color, color: "#FFFFFF",
                border: `1.5px solid ${c.border}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={16} strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {lead.pickupCity} → {lead.dropoffCity}
                </div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2, fontFamily: "'SF Mono', monospace" }}>
                  {lead.id} · {lead.clientFirstName} {lead.clientLastName[0]}.
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  display: "inline-block",
                  fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 999,
                  backgroundColor: lead.status === "available" ? c.successBg : lead.status === "full" ? c.warningBg : c.dangerBg,
                  color: lead.status === "available" ? c.success : lead.status === "full" ? c.warning : c.danger,
                  border: `1px solid currentColor`, textTransform: "uppercase", letterSpacing: "0.04em",
                }}>
                  {lead.status === "available" ? "Actif" : lead.status === "full" ? "Complet" : "Exp."}
                </div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2, fontWeight: 700 }}>
                  {lead.buyersCount}/5 · {lead.leadCostPoints}P
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenAdminDrivers({ c, t, navigate }) {
  const drivers = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: `drv_${i}`,
      firstName: rnd([...FIRSTNAMES_M, ...FIRSTNAMES_F]),
      lastName: rnd(LASTNAMES),
      phone: rndPhone(),
      kyc: rnd(["verified", "pending", "verified", "verified", "rejected"]),
      verticals: [...new Set([rnd(["freight", "moving", "towing", "bus"]), rnd(["freight", "moving", "towing", "bus"])])],
      balance: rndInt(0, 800),
      trips: rndInt(0, 450),
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      lastSeen: rnd(["en ligne", "il y a 5min", "il y a 1h", "hier", "il y a 3j"]),
    }));
  }, []);
  return (
    <>
      <TopBar c={c} title={t.drivers} onBack={() => navigate("admin_dashboard")} />
      <ScreenContainer c={c} bg={c.surface}>
        <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.02em" }}>
          {drivers.length} chauffeurs · {drivers.filter(d => d.kyc === "verified").length} vérifiés
        </div>
        {drivers.map(d => {
          const kycColors = {
            verified: { bg: c.successBg, fg: c.success, icon: ShieldCheck, label: "Vérifié" },
            pending: { bg: c.warningBg, fg: c.warning, icon: Clock, label: "En attente" },
            rejected: { bg: c.dangerBg, fg: c.danger, icon: X, label: "Refusé" },
          };
          const kc = kycColors[d.kyc];
          const KycIcon = kc.icon;
          return (
            <div key={d.id} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: 12, marginBottom: 8,
              backgroundColor: c.card,
              border: `1.5px solid ${c.border}`, borderRadius: 10,
              boxShadow: c.shadowSm,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 999,
                backgroundColor: c.primary, color: c.primaryFg,
                border: `1.5px solid ${c.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, flexShrink: 0,
              }}>{d.firstName[0]}{d.lastName[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 800 }}>{d.firstName} {d.lastName}</span>
                  <KycIcon size={12} color={kc.fg} strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2, fontFamily: "'SF Mono', monospace" }}>
                  {d.verticals.map(v => t[v]).join(" · ")} · ⭐ {d.rating}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: c.primary }}>{d.balance} PTS</div>
                <div style={{ fontSize: 9, color: c.textMuted, fontWeight: 700, marginTop: 2 }}>
                  {d.trips} courses
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function ScreenStyleGuide({ c, t, brand, navigate }) {
  const palette = [
    { name: "Primary", value: brand.primary },
    { name: "Text", value: c.text }, { name: "Background", value: c.bg },
    { name: "Surface", value: c.surface }, { name: "Border", value: c.border },
    { name: "Success", value: c.success }, { name: "Warning", value: c.warning },
    { name: "Danger", value: c.danger }, { name: "Info", value: c.info },
  ];
  return (
    <>
      <TopBar c={c} title="Style Guide" onBack={() => navigate("admin_dashboard")} />
      <ScreenContainer c={c} bg={c.surface}>
        <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Design System · Apple × Brutalisme
        </div>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Typography</div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Display 900</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>Heading 800</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Subhead 700</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: c.textMuted }}>Body 500</div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 8 }}>Eyebrow 800 Uppercase</div>
          <div style={{ fontSize: 12, fontFamily: "'SF Mono', monospace", marginTop: 6 }}>SF Mono · 0123456789</div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Palette</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {palette.map(p => (
              <div key={p.name} style={{ textAlign: "center" }}>
                <div style={{
                  height: 50, backgroundColor: p.value,
                  border: `1px solid ${c.border}`, borderRadius: 8,
                  marginBottom: 4,
                }} />
                <div style={{ fontSize: 10, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 9, fontFamily: "'SF Mono', monospace", color: c.textMuted }}>{p.value}</div>
              </div>
            ))}
          </div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Boutons</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <BrutButton c={c} variant="primary" size="md">Primary</BrutButton>
            <BrutButton c={c} variant="dark" size="md">Dark</BrutButton>
            <BrutButton c={c} variant="secondary" size="md">Secondary</BrutButton>
            <BrutButton c={c} variant="success" size="md">Success</BrutButton>
            <BrutButton c={c} variant="danger" size="md">Danger</BrutButton>
            <BrutButton c={c} variant="ghost" size="md">Ghost</BrutButton>
          </div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Chips & Badges</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <BrutChip c={c}>Standard</BrutChip>
            <BrutChip c={c} color={c.success} bgColor={c.successBg}>Success</BrutChip>
            <BrutChip c={c} color={c.warning} bgColor={c.warningBg}>Warning</BrutChip>
            <BrutChip c={c} color={c.danger} bgColor={c.dangerBg}>Danger</BrutChip>
            <BrutChip c={c} icon={Star}>With icon</BrutChip>
          </div>
        </BrutCard>
        <BrutCard c={c} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: c.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Verticales</div>
          <div style={{ display: "flex", gap: 12 }}>
            {["freight", "moving", "towing", "bus"].map(v => (
              <div key={v} style={{ textAlign: "center", flex: 1 }}>
                <VerticalIconBlock vertical={v} c={c} size={56} />
                <div style={{ fontSize: 10, fontWeight: 700, marginTop: 6 }}>{t[v]}</div>
              </div>
            ))}
          </div>
        </BrutCard>
        <div style={{ height: 20 }} />
      </ScreenContainer>
    </>
  );
}
function WhiteLabelPanel({ c, brand, setBrand, onClose, t }) {
  const [draft, setDraft] = useState(brand);
  const presets = [
    { name: "RELAYZ", primary: "#FF6B35", logoEmoji: "🚛" },
    { name: "TRANSEXPRESS", primary: "#0066FF", logoEmoji: "⚡" },
    { name: "TUNISTRANS", primary: "#10B981", logoEmoji: "🚀" },
    { name: "CARTHAGE LOG", primary: "#7C3AED", logoEmoji: "🏛️" },
    { name: "SAHARA FRET", primary: "#F59E0B", logoEmoji: "🌅" },
    { name: "MEDINA EXPRESS", primary: "#EF4444", logoEmoji: "🔥" },
  ];
  const apply = () => { setBrand(draft); onClose(); };
  const reset = () => setDraft(DEFAULT_BRAND);
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      backgroundColor: c.overlay, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      animation: `fadeIn 250ms ${EASE_OUT}`,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 500,
        backgroundColor: c.bg, color: c.text,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        boxShadow: c.shadowXl,
        padding: "10px 24px 28px", maxHeight: "88vh", overflowY: "auto",
        animation: `slideUp 380ms ${SPRING}`,
      }}>
        <div style={{ width: 38, height: 5, backgroundColor: c.borderStrong, borderRadius: 999, margin: "8px auto 18px" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 999,
              backgroundColor: hexA(c.primary, 0.12), color: c.primary,
              fontSize: 11, fontWeight: 600, letterSpacing: "-0.005em", marginBottom: 10,
            }}>
              <Sparkles size={11} strokeWidth={2.5} /> Démo live
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{t.customize_brand}</div>
            <div style={{ fontSize: 13, color: c.textMuted, marginTop: 4, fontWeight: 500 }}>Changez la marque en temps réel</div>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 999,
            backgroundColor: c.surfaceAlt, color: c.textMuted, border: "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: `background-color 150ms`,
          }}>
            <X size={18} strokeWidth={2.25} />
          </button>
        </div>
        <div style={{
          padding: 18, marginTop: 18, marginBottom: 22,
          background: `linear-gradient(135deg, ${draft.primary} 0%, ${hexA(draft.primary, 0.7)} 100%)`,
          color: "#FFFFFF",
          borderRadius: 20,
          boxShadow: `0 8px 24px ${hexA(draft.primary, 0.30)}`,
          display: "flex", alignItems: "center", gap: 16,
          transition: `background 400ms ${EASE_OUT}, box-shadow 400ms ${EASE_OUT}`,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            backgroundColor: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32,
          }}>{draft.logoEmoji}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{draft.name}</div>
            <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.85, marginTop: 2 }}>{t.tagline_full}</div>
          </div>
        </div>
        <BrutInput c={c} label={t.brand_name} value={draft.name} onChange={v => setDraft({ ...draft, name: v.toUpperCase() })} placeholder="Votre marque" maxLength={20} />
        <div style={{ height: 16 }} />
        <div style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, marginLeft: 2 }}>{t.logo_emoji}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {["🚛", "⚡", "🚀", "🏛️", "🌅", "🔥", "🦁", "🐪", "⭐", "💎", "🎯", "🏎️"].map(e => {
            const sel = draft.logoEmoji === e;
            return (
              <button key={e} onClick={() => setDraft({ ...draft, logoEmoji: e })} style={{
                width: 46, height: 46, fontSize: 22,
                backgroundColor: sel ? hexA(c.primary, 0.12) : c.surfaceAlt,
                border: `1.5px solid ${sel ? c.primary : "transparent"}`,
                borderRadius: 12,
                cursor: "pointer", transition: `all 150ms ${EASE_OUT}`,
              }}>{e}</button>
            );
          })}
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, marginLeft: 2 }}>{t.primary_color}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          {["#FF6B35", "#0066FF", "#10B981", "#F59E0B", "#EF4444", "#7C3AED", "#EC4899", "#06B6D4", "#000000"].map(col => {
            const sel = draft.primary === col;
            return (
              <button key={col} onClick={() => setDraft({ ...draft, primary: col })} style={{
                width: 40, height: 40, borderRadius: 999,
                backgroundColor: col, border: "none",
                cursor: "pointer", transition: `all 200ms ${SPRING}`,
                transform: sel ? "scale(1.1)" : "scale(1)",
                boxShadow: sel ? `0 0 0 3px ${c.bg}, 0 0 0 5px ${col}, 0 4px 12px ${hexA(col, 0.40)}` : `0 2px 6px ${hexA(col, 0.30)}`,
              }} />
            );
          })}
        </div>
        <input type="color" value={draft.primary}
          onChange={e => setDraft({ ...draft, primary: e.target.value })}
          style={{ width: "100%", height: 40, border: `1px solid ${c.border}`, borderRadius: 12, cursor: "pointer", backgroundColor: c.card, marginBottom: 20 }} />
        <div style={{ fontSize: 13, fontWeight: 500, color: c.textMuted, marginBottom: 8, marginLeft: 2 }}>Marques pré-configurées</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
          {presets.map(p => (
            <button key={p.name} onClick={() => setDraft({ ...DEFAULT_BRAND, ...p })} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              backgroundColor: c.surfaceAlt, color: c.text, border: "none",
              borderRadius: 12, cursor: "pointer",
              fontFamily: "inherit", textAlign: "left",
              transition: `background-color 150ms`,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: p.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{p.logoEmoji}</div>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.005em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <BrutButton c={c} variant="secondary" size="md" icon={RotateCcw} onClick={reset}>
            {t.reset_brand}
          </BrutButton>
          <div style={{ flex: 1 }}>
            <BrutButton c={c} variant="primary" size="md" fullWidth icon={Check} onClick={apply}>
              {t.apply}
            </BrutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
function PhoneFrame({ children, c }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  if (isMobile) {
    return <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: c.bg }}>{children}</div>;
  }
  return (
    <div style={{
      width: 390, height: 800, position: "relative",
      backgroundColor: c.bg, overflow: "hidden",
      borderRadius: 48,
      boxShadow: `0 32px 64px rgba(0,0,0,0.20), 0 8px 20px rgba(0,0,0,0.12), 0 0 0 10px ${c.surfaceAlt}, 0 0 0 11px ${c.borderStrong}`,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 38,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", fontSize: 14, fontWeight: 600,
        color: c.text, zIndex: 100, pointerEvents: "none",
        fontVariantNumeric: "tabular-nums", letterSpacing: "-0.005em",
      }}>
        <span>9:41</span>
        <div style={{
          position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)",
          width: 110, height: 26, borderRadius: 999, backgroundColor: c.text,
        }} />
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill={c.text} />
            <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill={c.text} />
            <rect x="8" y="3" width="2.5" height="8" rx="0.5" fill={c.text} />
            <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill={c.text} />
          </svg>
          <Wifi size={14} strokeWidth={2.25} />
          <div style={{
            width: 24, height: 12, border: `1.5px solid ${c.text}`, borderRadius: 4,
            padding: 1.5, display: "flex", alignItems: "center", position: "relative",
          }}>
            <div style={{ width: "82%", height: "100%", backgroundColor: c.text, borderRadius: 1.5 }} />
            <div style={{ position: "absolute", right: -3, top: "30%", width: 1.5, height: "40%", backgroundColor: c.text, borderRadius: 1 }} />
          </div>
        </div>
      </div>
      <div style={{ height: 38, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}
function ControlPanel({ c, theme, setTheme, locale, setLocale, onWhiteLabel, brand }) {
  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 200,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <TapScale onClick={onWhiteLabel} scale={0.92}>
        <button title="White-Label" style={{
          width: 60, height: 60, borderRadius: 999,
          background: `linear-gradient(135deg, ${brand.primary} 0%, ${hexA(brand.primary, 0.7)} 100%)`,
          color: "#FFFFFF", border: "none",
          boxShadow: `0 8px 24px ${hexA(brand.primary, 0.40)}, 0 2px 6px ${hexA(brand.primary, 0.30)}`,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          animation: "pulse 2.5s ease-in-out infinite",
        }}>
          <Palette size={24} strokeWidth={2.25} />
          <div style={{
            position: "absolute", top: -2, right: -2,
            width: 22, height: 22, borderRadius: 999,
            background: "#FFFFFF",
            color: brand.primary,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700,
          }}>★</div>
        </button>
      </TapScale>
      <TapScale onClick={() => setTheme(theme === "light" ? "dark" : "light")} scale={0.92}>
        <button title="Theme" style={{
          width: 50, height: 50, borderRadius: 999,
          backgroundColor: c.card, color: c.textMuted, border: `1px solid ${c.border}`,
          boxShadow: c.shadowMd,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {theme === "light" ? <Moon size={18} strokeWidth={2.25} /> : <Sun size={18} strokeWidth={2.25} />}
        </button>
      </TapScale>
      <TapScale onClick={() => setLocale(locale === "fr" ? "ar" : "fr")} scale={0.92}>
        <button title="Language" style={{
          width: 50, height: 50, borderRadius: 999,
          backgroundColor: c.card, color: c.textMuted, border: `1px solid ${c.border}`,
          boxShadow: c.shadowMd,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em",
          fontFamily: "inherit",
        }}>
          {locale === "fr" ? "ع" : "FR"}
        </button>
      </TapScale>
    </div>
  );
}
const DRIVER_TABS = ["driver_feed", "driver_wallet", "driver_history", "driver_profile"];
export default function App() {
  const [theme, setTheme] = useState("light");
  const [locale, setLocale] = useState("fr");
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [showWL, setShowWL] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [screenParams, setScreenParams] = useState({});
  const [history, setHistory] = useState([]);
  const [prefs, setPrefs] = useState(["freight", "moving", "towing", "bus"]);
  const [balance, setBalance] = useState(180);
  const [bought, setBought] = useState([]);
  const [audioOn, setAudioOn] = useState(false);
  const [formData, setFormData] = useState({});
  const [leads] = useState(() => generateLeads(32));
  const [transactions, setTransactions] = useState(() => generateTransactions(15));
  const c = useThemeStyles(theme, brand);
  const t = I18N[locale];
  const navigate = useCallback((screen, params = {}) => {
    if (screen === -1) {
      const prev = history[history.length - 1];
      if (prev) {
        setHistory(h => h.slice(0, -1));
        setCurrentScreen(prev.screen);
        setScreenParams(prev.params);
      } else {
        setCurrentScreen("splash");
        setScreenParams({});
      }
      return;
    }
    setHistory(h => [...h, { screen: currentScreen, params: screenParams }]);
    setCurrentScreen(screen);
    setScreenParams(params);
  }, [currentScreen, screenParams, history]);
  const handleBuy = (lead) => {
    setBalance(b => b - lead.leadCostPoints);
    setBought(b => [...b, lead.id]);
    setTransactions(tx => [{
      id: `tx_${Date.now()}`, type: "purchase",
      amount: -lead.leadCostPoints, description: `Annonce ${t[lead.vertical]}`, hoursAgo: 0,
    }, ...tx]);
  };
  const handleRecharge = (amount) => {
    setBalance(b => b + amount);
    setTransactions(tx => [{
      id: `tx_${Date.now()}`, type: "recharge",
      amount, description: `Recharge Carte bancaire`, hoursAgo: 0,
    }, ...tx]);
  };
  const isDriverTab = DRIVER_TABS.includes(currentScreen);
  const renderScreen = () => {
    const common = { c, t, brand, navigate };
    switch (currentScreen) {
      case "splash": return <ScreenSplash {...common} />;
      case "driver_login": return <ScreenDriverLogin {...common} />;
      case "driver_otp": return <ScreenOTP {...common} params={screenParams} nextScreen="driver_prefs" />;
      case "driver_prefs": return <ScreenDriverPrefs {...common} prefs={prefs} setPrefs={setPrefs} />;
      case "driver_feed": return <ScreenDriverFeed {...common} leads={leads} prefs={prefs} audioOn={audioOn} setAudioOn={setAudioOn} balance={balance} />;
      case "driver_lead_detail": return <ScreenDriverLeadDetail {...common} leads={leads} params={screenParams} balance={balance} setBalance={setBalance} onBuy={handleBuy} />;
      case "driver_lead_success": return <ScreenDriverLeadSuccess {...common} leads={leads} params={screenParams} />;
      case "driver_wallet": return <ScreenDriverWallet {...common} balance={balance} transactions={transactions} />;
      case "driver_recharge": return <ScreenDriverRecharge {...common} onRecharge={handleRecharge} />;
      case "driver_history": return <ScreenDriverHistory {...common} leads={leads} bought={bought} />;
      case "driver_profile": return <ScreenDriverProfile {...common} prefs={prefs} />;
      case "client_home": return <ScreenClientHome {...common} />;
      case "client_form_freight": return <ScreenClientFormFreight {...common} formData={formData} setFormData={setFormData} />;
      case "client_form_moving": return <ScreenClientFormMoving {...common} formData={formData} setFormData={setFormData} />;
      case "client_form_towing": return <ScreenClientFormTowing {...common} formData={formData} setFormData={setFormData} />;
      case "client_form_bus": return <ScreenClientFormBus {...common} formData={formData} setFormData={setFormData} />;
      case "client_recap": return <ScreenClientRecap {...common} formData={formData} params={screenParams} />;
      case "client_otp": return <ScreenOTP {...common} params={screenParams} nextScreen={screenParams.nextScreen} />;
      case "client_publishing": return <ScreenClientPublishing {...common} params={screenParams} />;
      case "client_tracking": return <ScreenClientTracking {...common} params={screenParams} />;
      case "admin_dashboard": return <ScreenAdminDashboard {...common} leads={leads} />;
      case "admin_leads": return <ScreenAdminLeads {...common} leads={leads} />;
      case "admin_drivers": return <ScreenAdminDrivers {...common} />;
      case "style_guide": return <ScreenStyleGuide {...common} />;
      default: return <ScreenSplash {...common} />;
    }
  };
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} style={{
      minHeight: "100vh", width: "100%",
      backgroundColor: c.surfaceAlt, color: c.text,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px 10px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif",
      transition: "background-color 300ms",
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.9); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0.6; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes screenSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        body, html, #root { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${c.borderStrong}; border-radius: 999px; }
        ::-webkit-scrollbar-track { background: transparent; }
        button { font-family: inherit; }
        button:focus-visible { outline: 2px solid ${c.primary}; outline-offset: 2px; }
        button:focus:not(:focus-visible) { outline: none; }
        input:focus { outline: none; }
        input::placeholder { color: ${c.textSubtle}; }
        ::selection { background: ${hexA(c.primary, 0.25)}; color: ${c.text}; }
      `}</style>
      <PhoneFrame c={c}>
        {renderScreen()}
        {isDriverTab && <BottomNav c={c} current={currentScreen} onNavigate={navigate} t={t} />}
      </PhoneFrame>
      <ControlPanel c={c} theme={theme} setTheme={setTheme} locale={locale} setLocale={setLocale} brand={brand} onWhiteLabel={() => setShowWL(true)} />
      {showWL && <WhiteLabelPanel c={c} brand={brand} setBrand={setBrand} onClose={() => setShowWL(false)} t={t} />}
    </div>
  );
}
