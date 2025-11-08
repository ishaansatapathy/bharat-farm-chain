import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  Camera,
  FlaskConical,
  Sprout,
  MapPin,
  Wallet,
  Leaf,
  Droplets,
  Sun,
  Wind,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Rocket,
  Wrench,
  FileText,
  AlertCircle,
  Sparkles,
  Users,
  Award,
  DollarSign,
  BarChart3,
  Heart,
  GraduationCap,
  Video,
  Target,
  Wheat,
  TreePine,
  Package,
  Store,
  ShoppingCart,
  Shield,
  Activity,
  ExternalLink,
  X,
} from "lucide-react";

const ExpertQA = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFarmingType, setSelectedFarmingType] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
  const [soilAnalysisResults, setSoilAnalysisResults] = useState<any>(null);
  const [imageType, setImageType] = useState<"soil" | "leaf" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    region: "",
    state: "",
    district: "",
    budget: "",
    soilType: "",
    experience: "",
    farmSize: "",
    cropsInterested: [] as string[],
  });

  const steps = [
    { id: 0, title: "Knowledge Hub", icon: BookOpen },
    { id: 1, title: "Your Region", icon: MapPin },
    { id: 2, title: "Budget & Scale", icon: Wallet },
    { id: 3, title: "Soil Type", icon: Leaf },
    { id: 4, title: "Soil Analysis", icon: FlaskConical },
    { id: 5, title: "Analysis & Guidance", icon: TrendingUp },
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const soilTypes = [
    "Alluvial Soil",
    "Black Soil (Regur)",
    "Red Soil",
    "Laterite Soil",
    "Mountain Soil",
    "Desert Soil",
    "Saline & Alkaline Soil",
    "Peaty & Marshy Soil",
  ];

  const budgetRanges = [
    { value: "0-50000", label: "₹0 - ₹50,000 (Small Scale)" },
    { value: "50000-200000", label: "₹50,000 - ₹2,00,000 (Medium Scale)" },
    { value: "200000-500000", label: "₹2,00,000 - ₹5,00,000 (Large Scale)" },
    { value: "500000+", label: "₹5,00,000+ (Commercial Scale)" },
  ];

  const experienceLevels = [
    "Complete Beginner",
    "1-2 Years Experience",
    "3-5 Years Experience",
    "5+ Years Experience",
  ];

  const crops = [
    "Rice", "Wheat", "Maize", "Sugarcane", "Cotton", "Turmeric", "Onions",
    "Tomatoes", "Potatoes", "Peppers", "Pulses", "Oilseeds", "Fruits",
    "Vegetables", "Spices", "Floriculture",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCropToggle = (crop: string) => {
    setFormData((prev) => {
      const crops = prev.cropsInterested.includes(crop)
        ? prev.cropsInterested.filter((c) => c !== crop)
        : [...prev.cropsInterested, crop];
      return { ...prev, cropsInterested: crops };
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setSelectedImages((prev) => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setSelectedImages((prev) => [...prev, imageData]);
        stopCamera();
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.3,
      },
    },
  };

  // GSAP animations for progress bar
  useEffect(() => {
    if (progressRef.current) {
      const progress = (currentStep / (steps.length - 1)) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [currentStep, steps.length]);

  // Header animation on mount
  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Detect image type based on color analysis (fake but realistic)
  const detectImageType = (imageUrl: string): "soil" | "leaf" => {
    // Simulate color analysis by checking image characteristics
    // In a real implementation, this would analyze the actual image colors
    // For now, we'll use a simple heuristic: if it's the first image or random chance
    // In practice, you'd analyze dominant colors (green = leaf, brown/red = soil)
    
    // Simulate: if image has more green tones, it's a leaf; otherwise soil
    // For demo purposes, we'll alternate or use a simple check
    const isLeaf = Math.random() > 0.5; // 50% chance, but in real app would analyze colors
    
    // You could also check image dimensions, aspect ratio, etc.
    // For now, return based on a simple heuristic
    return isLeaf ? "leaf" : "soil";
  };

  // Generate fake but realistic leaf analysis results based on color
  const generateLeafAnalysis = () => {
    const getRandomValue = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(2);
    };

    // Analyze leaf color to determine health status
    // Simulate color analysis: green = healthy, yellow = nitrogen deficiency, brown = disease, etc.
    const colorAnalysis = {
      dominantColor: Math.random() > 0.3 ? "Green" : Math.random() > 0.5 ? "Yellow-Green" : "Brown",
      greenIntensity: getRandomValue(60, 100),
      yellowSpots: Math.random() > 0.6,
      brownEdges: Math.random() > 0.7,
      leafVeins: Math.random() > 0.4 ? "Visible" : "Faded",
    };

    // Determine health status based on color
    let healthStatus = "Healthy";
    let healthScore = 85;
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Nitrogen deficiency (yellowing leaves)
    if (colorAnalysis.dominantColor.includes("Yellow") || parseFloat(colorAnalysis.greenIntensity) < 70) {
      healthStatus = "Nitrogen Deficiency Detected";
      healthScore = 65;
      issues.push("Nitrogen Deficiency - Yellowing of leaves");
      recommendations.push("Apply nitrogen-rich fertilizer (Urea 46% N) at 100-150 kg/ha");
      recommendations.push("Use organic compost or farmyard manure to improve nitrogen levels");
      recommendations.push("Consider foliar spray of urea solution (2% concentration)");
    }

    // Potassium deficiency (brown edges)
    if (colorAnalysis.brownEdges) {
      healthStatus = "Potassium Deficiency Detected";
      healthScore = Math.min(healthScore, 70);
      issues.push("Potassium Deficiency - Brown leaf edges and margins");
      recommendations.push("Apply MOP (Muriate of Potash) at 50-100 kg/ha");
      recommendations.push("Use wood ash or compost to improve potassium levels");
    }

    // Disease detection (brown spots)
    if (colorAnalysis.yellowSpots && colorAnalysis.brownEdges) {
      healthStatus = "Possible Disease or Pest Infestation";
      healthScore = Math.min(healthScore, 60);
      issues.push("Leaf Spots Detected - Possible fungal or bacterial infection");
      recommendations.push("Apply fungicide (Mancozeb or Copper-based) as per recommended dosage");
      recommendations.push("Remove and destroy affected leaves to prevent spread");
      recommendations.push("Ensure proper spacing and ventilation to reduce humidity");
    }

    // Overall health assessment
    if (healthScore >= 80) {
      healthStatus = "Healthy";
    } else if (healthScore >= 70) {
      healthStatus = "Moderate Health";
    } else {
      healthStatus = "Needs Attention";
    }

    // Generate nutrient analysis
    const nutrients = {
      nitrogen: {
        value: colorAnalysis.dominantColor.includes("Yellow") ? getRandomValue(1.5, 2.5) : getRandomValue(2.5, 4.0),
        unit: "%",
        status: colorAnalysis.dominantColor.includes("Yellow") ? "Deficient" : "Adequate",
        ideal: "2.5-4.0%"
      },
      phosphorus: {
        value: getRandomValue(0.15, 0.35),
        unit: "%",
        status: "Adequate",
        ideal: "0.2-0.4%"
      },
      potassium: {
        value: colorAnalysis.brownEdges ? getRandomValue(0.8, 1.5) : getRandomValue(1.5, 3.0),
        unit: "%",
        status: colorAnalysis.brownEdges ? "Deficient" : "Adequate",
        ideal: "1.5-3.0%"
      },
      chlorophyll: {
        value: getRandomValue(parseFloat(colorAnalysis.greenIntensity) * 0.8, parseFloat(colorAnalysis.greenIntensity)),
        unit: "SPAD units",
        status: parseFloat(colorAnalysis.greenIntensity) > 70 ? "Optimal" : "Low",
        ideal: "40-60 SPAD"
      }
    };

    // Generate disease/pest analysis
    const diseases: any[] = [];
    if (colorAnalysis.yellowSpots) {
      diseases.push({
        name: "Leaf Spot Disease",
        severity: "Moderate",
        confidence: "75%",
        treatment: "Apply fungicide and improve air circulation"
      });
    }
    if (colorAnalysis.brownEdges && colorAnalysis.dominantColor.includes("Brown")) {
      diseases.push({
        name: "Leaf Blight",
        severity: "Low",
        confidence: "60%",
        treatment: "Remove affected leaves and apply copper-based fungicide"
      });
    }

    // Generate pest analysis
    const pests: any[] = [];
    if (colorAnalysis.yellowSpots) {
      pests.push({
        name: "Aphids or Thrips",
        severity: "Low",
        confidence: "65%",
        treatment: "Apply neem oil or insecticidal soap"
      });
    }

    return {
      colorAnalysis,
      healthStatus,
      healthScore,
      nutrients,
      diseases,
      pests,
      issues,
      recommendations,
      leafAge: Math.random() > 0.5 ? "Mature" : "Young",
      leafSize: Math.random() > 0.5 ? "Normal" : "Stunted",
      analysisDate: new Date().toLocaleDateString(),
      overallStatus: healthScore >= 80 ? "Good" : healthScore >= 70 ? "Moderate" : "Needs Improvement",
    };
  };

  // Generate fake but realistic soil analysis results
  const generateSoilAnalysis = () => {
    // Generate random but realistic values based on soil type
    const getRandomValue = (min: number, max: number) => {
      return (Math.random() * (max - min) + min).toFixed(2);
    };

    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Base values vary by soil type
    let baseValues: any = {};
    if (formData.soilType === "Alluvial Soil") {
      baseValues = {
        nitrogen: { value: getRandomValue(280, 350), unit: "kg/ha", status: "Optimal", ideal: "250-400" },
        phosphorus: { value: getRandomValue(15, 25), unit: "kg/ha", status: "Good", ideal: "10-30" },
        potassium: { value: getRandomValue(200, 300), unit: "kg/ha", status: "Optimal", ideal: "150-300" },
        pH: { value: getRandomValue(6.5, 7.5), unit: "", status: "Optimal", ideal: "6.0-7.5" },
        organicMatter: { value: getRandomValue(2.5, 4.0), unit: "%", status: "Good", ideal: "2-5%" },
        waterAbsorption: { value: getRandomValue(35, 45), unit: "%", status: "Excellent", ideal: "30-50%" },
        soilTexture: "Loamy",
        bulkDensity: { value: getRandomValue(1.2, 1.4), unit: "g/cm³", status: "Good", ideal: "1.0-1.5" },
        cationExchange: { value: getRandomValue(15, 25), unit: "cmol/kg", status: "Optimal", ideal: "12-25" },
        electricalConductivity: { value: getRandomValue(0.5, 1.5), unit: "dS/m", status: "Normal", ideal: "0-2" },
      };
    } else if (formData.soilType === "Black Soil (Regur)") {
      baseValues = {
        nitrogen: { value: getRandomValue(200, 280), unit: "kg/ha", status: "Moderate", ideal: "250-400" },
        phosphorus: { value: getRandomValue(8, 15), unit: "kg/ha", status: "Low", ideal: "10-30" },
        potassium: { value: getRandomValue(300, 400), unit: "kg/ha", status: "Optimal", ideal: "150-300" },
        pH: { value: getRandomValue(7.0, 8.5), unit: "", status: "Slightly Alkaline", ideal: "6.0-7.5" },
        organicMatter: { value: getRandomValue(1.5, 3.0), unit: "%", status: "Moderate", ideal: "2-5%" },
        waterAbsorption: { value: getRandomValue(40, 55), unit: "%", status: "Excellent", ideal: "30-50%" },
        soilTexture: "Clay",
        bulkDensity: { value: getRandomValue(1.3, 1.5), unit: "g/cm³", status: "Moderate", ideal: "1.0-1.5" },
        cationExchange: { value: getRandomValue(30, 50), unit: "cmol/kg", status: "Excellent", ideal: "12-25" },
        electricalConductivity: { value: getRandomValue(1.0, 2.5), unit: "dS/m", status: "Moderate", ideal: "0-2" },
      };
    } else if (formData.soilType === "Red Soil") {
      baseValues = {
        nitrogen: { value: getRandomValue(150, 220), unit: "kg/ha", status: "Low", ideal: "250-400" },
        phosphorus: { value: getRandomValue(5, 12), unit: "kg/ha", status: "Deficient", ideal: "10-30" },
        potassium: { value: getRandomValue(100, 180), unit: "kg/ha", status: "Low", ideal: "150-300" },
        pH: { value: getRandomValue(5.5, 6.5), unit: "", status: "Acidic", ideal: "6.0-7.5" },
        organicMatter: { value: getRandomValue(0.8, 2.0), unit: "%", status: "Low", ideal: "2-5%" },
        waterAbsorption: { value: getRandomValue(25, 35), unit: "%", status: "Moderate", ideal: "30-50%" },
        soilTexture: "Sandy Loam",
        bulkDensity: { value: getRandomValue(1.4, 1.6), unit: "g/cm³", status: "High", ideal: "1.0-1.5" },
        cationExchange: { value: getRandomValue(5, 12), unit: "cmol/kg", status: "Low", ideal: "12-25" },
        electricalConductivity: { value: getRandomValue(0.3, 0.8), unit: "dS/m", status: "Normal", ideal: "0-2" },
      };
    } else {
      // Default values for other soil types
      baseValues = {
        nitrogen: { value: getRandomValue(180, 280), unit: "kg/ha", status: "Moderate", ideal: "250-400" },
        phosphorus: { value: getRandomValue(10, 18), unit: "kg/ha", status: "Moderate", ideal: "10-30" },
        potassium: { value: getRandomValue(150, 250), unit: "kg/ha", status: "Good", ideal: "150-300" },
        pH: { value: getRandomValue(6.0, 7.0), unit: "", status: "Optimal", ideal: "6.0-7.5" },
        organicMatter: { value: getRandomValue(1.5, 3.5), unit: "%", status: "Moderate", ideal: "2-5%" },
        waterAbsorption: { value: getRandomValue(30, 42), unit: "%", status: "Good", ideal: "30-50%" },
        soilTexture: "Loamy",
        bulkDensity: { value: getRandomValue(1.2, 1.5), unit: "g/cm³", status: "Good", ideal: "1.0-1.5" },
        cationExchange: { value: getRandomValue(12, 22), unit: "cmol/kg", status: "Good", ideal: "12-25" },
        electricalConductivity: { value: getRandomValue(0.5, 1.8), unit: "dS/m", status: "Normal", ideal: "0-2" },
      };
    }

    // Generate issues and recommendations
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check nitrogen
    if (parseFloat(baseValues.nitrogen.value) < 250) {
      issues.push("Nitrogen Deficiency Detected");
      recommendations.push("Apply nitrogen-rich fertilizers like Urea (46% N) at 100-150 kg/ha");
      recommendations.push("Use organic compost or farmyard manure to improve nitrogen levels");
    }

    // Check phosphorus
    if (parseFloat(baseValues.phosphorus.value) < 10) {
      issues.push("Phosphorus Deficiency Detected");
      recommendations.push("Apply DAP (Di-Ammonium Phosphate) or SSP (Single Super Phosphate)");
      recommendations.push("Add bone meal or rock phosphate for organic phosphorus");
    }

    // Check potassium
    if (parseFloat(baseValues.potassium.value) < 150) {
      issues.push("Potassium Deficiency Detected");
      recommendations.push("Apply MOP (Muriate of Potash) at 50-100 kg/ha");
      recommendations.push("Use wood ash or compost to improve potassium levels");
    }

    // Check pH
    if (parseFloat(baseValues.pH.value) < 6.0) {
      issues.push("Soil is Too Acidic");
      recommendations.push("Apply lime (CaCO3) at 2-4 tons/ha to raise pH");
      recommendations.push("Use dolomite lime for magnesium deficiency");
    } else if (parseFloat(baseValues.pH.value) > 7.5) {
      issues.push("Soil is Too Alkaline");
      recommendations.push("Apply gypsum (CaSO4) at 1-2 tons/ha to lower pH");
      recommendations.push("Use sulfur or organic matter to acidify soil");
    }

    // Check organic matter
    if (parseFloat(baseValues.organicMatter.value) < 2.0) {
      issues.push("Low Organic Matter Content");
      recommendations.push("Add compost or farmyard manure at 10-15 tons/ha");
      recommendations.push("Practice green manuring with leguminous crops");
    }

    // Check water absorption
    if (parseFloat(baseValues.waterAbsorption.value) < 30) {
      issues.push("Poor Water Absorption Capacity");
      recommendations.push("Add organic matter to improve water retention");
      recommendations.push("Consider mulching to reduce water loss");
    }

    // Generate micronutrient analysis
    const micronutrients = {
      iron: { value: getRandomValue(4.5, 8.5), unit: "mg/kg", status: "Adequate", ideal: "4.5-10" },
      zinc: { value: getRandomValue(0.8, 2.5), unit: "mg/kg", status: "Adequate", ideal: "0.8-3.0" },
      manganese: { value: getRandomValue(5.0, 15.0), unit: "mg/kg", status: "Adequate", ideal: "5-20" },
      copper: { value: getRandomValue(1.0, 3.0), unit: "mg/kg", status: "Adequate", ideal: "1-3" },
      boron: { value: getRandomValue(0.5, 1.5), unit: "mg/kg", status: "Adequate", ideal: "0.5-2.0" },
      molybdenum: { value: getRandomValue(0.1, 0.5), unit: "mg/kg", status: "Adequate", ideal: "0.1-0.5" },
    };

    // Overall health score
    let healthScore = 75;
    if (issues.length === 0) healthScore = 90;
    else if (issues.length === 1) healthScore = 80;
    else if (issues.length === 2) healthScore = 70;
    else healthScore = 60;

    return {
      ...baseValues,
      micronutrients,
      issues,
      recommendations,
      healthScore,
      analysisDate: new Date().toLocaleDateString(),
      soilTexture: baseValues.soilTexture,
      overallStatus: healthScore >= 80 ? "Good" : healthScore >= 70 ? "Moderate" : "Needs Improvement",
    };
  };

  const handleAnalyze = () => {
    // Detect image type based on first image
    if (selectedImages.length > 0) {
      const detectedType = detectImageType(selectedImages[0]);
      setImageType(detectedType);
      
      // Generate appropriate analysis based on image type
      if (detectedType === "leaf") {
        const analysis = generateLeafAnalysis();
        setSoilAnalysisResults(analysis);
      } else {
        const analysis = generateSoilAnalysis();
        setSoilAnalysisResults(analysis);
      }
    } else {
      // Default to soil analysis if no images
      const analysis = generateSoilAnalysis();
      setSoilAnalysisResults(analysis);
      setImageType("soil");
    }
    
    setShowAnalysis(true);
    setCurrentStep(5);
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Budget-based recommendations
    if (formData.budget === "0-50000") {
      recommendations.push({
        title: "Start Small with High-Value Crops",
        description: "Focus on vegetables, spices, or floriculture that require less land but offer higher returns.",
        icon: Sprout,
      });
    } else if (formData.budget === "50000-200000") {
      recommendations.push({
        title: "Medium-Scale Farming",
        description: "Consider mixed farming with vegetables, fruits, and small-scale dairy or poultry.",
        icon: TrendingUp,
      });
    } else {
      recommendations.push({
        title: "Commercial Farming",
        description: "You can invest in modern equipment, irrigation systems, and large-scale crop production.",
        icon: Rocket,
      });
    }

    // Soil-based recommendations
    if (formData.soilType === "Alluvial Soil") {
      recommendations.push({
        title: "Ideal for Rice and Wheat",
        description: "Alluvial soil is perfect for rice, wheat, sugarcane, and pulses. Consider crop rotation for better yields.",
        icon: Leaf,
      });
    } else if (formData.soilType === "Black Soil (Regur)") {
      recommendations.push({
        title: "Cotton and Oilseeds",
        description: "Black soil is excellent for cotton, soybeans, and groundnut. Add organic matter for better water retention.",
        icon: Droplets,
      });
    } else if (formData.soilType === "Red Soil") {
      recommendations.push({
        title: "Red Soil Management",
        description: "Suitable for millets, pulses, and oilseeds. Add lime and organic compost to improve fertility.",
        icon: Sun,
      });
    }

    // Region-based recommendations
    if (formData.state === "Karnataka") {
      recommendations.push({
        title: "Karnataka-Specific Crops",
        description: "Consider coffee, cardamom, areca nut, paddy, ragi, and sugarcane. Leverage monsoon patterns.",
        icon: MapPin,
      });
    } else if (formData.state === "Maharashtra") {
      recommendations.push({
        title: "Maharashtra Farming",
        description: "Ideal for sugarcane, cotton, grapes, oranges, and onions. Focus on drip irrigation for water efficiency.",
        icon: Wind,
      });
    }

    return recommendations;
  };

  const getStartupIdeas = () => {
    return [
      {
        title: "Organic Farming Startup",
        description: "Start with organic vegetables and fruits. Market directly to urban consumers through online platforms.",
        investment: "₹2-5 Lakhs",
        potential: "High",
      },
      {
        title: "Hydroponics/Vertical Farming",
        description: "Grow crops without soil using nutrient-rich water. Perfect for urban areas and high-value crops.",
        investment: "₹5-10 Lakhs",
        potential: "Very High",
      },
      {
        title: "Dairy & Poultry Farm",
        description: "Start with 5-10 cows or 100-200 chickens. Steady income with daily returns.",
        investment: "₹3-7 Lakhs",
        potential: "Medium-High",
      },
      {
        title: "Mushroom Farming",
        description: "Low investment, high returns. Can be done in small spaces. Growing demand in urban markets.",
        investment: "₹50,000 - ₹2 Lakhs",
        potential: "High",
      },
      {
        title: "Floriculture Business",
        description: "Grow flowers for local markets, events, and export. High margins with proper marketing.",
        investment: "₹1-3 Lakhs",
        potential: "Medium-High",
      },
      {
        title: "Beekeeping (Apiculture)",
        description: "Low investment, multiple income streams (honey, wax, pollination services).",
        investment: "₹50,000 - ₹1.5 Lakhs",
        potential: "High",
      },
    ];
  };

  const getAccessories = () => {
    return [
      {
        category: "Essential Tools",
        items: [
          "Plough & Tiller (₹15,000 - ₹50,000)",
          "Seeder (₹10,000 - ₹30,000)",
          "Harvester (₹2-5 Lakhs)",
          "Sprayer (₹5,000 - ₹20,000)",
        ],
      },
      {
        category: "Irrigation Equipment",
        items: [
          "Drip Irrigation System (₹30,000 - ₹1 Lakh/acre)",
          "Sprinkler System (₹20,000 - ₹80,000/acre)",
          "Water Pump (₹5,000 - ₹25,000)",
          "Water Storage Tank (₹10,000 - ₹50,000)",
        ],
      },
      {
        category: "Soil Testing & Monitoring",
        items: [
          "Soil Testing Kit (₹2,000 - ₹10,000)",
          "pH Meter (₹1,000 - ₹5,000)",
          "Moisture Sensor (₹3,000 - ₹15,000)",
          "Weather Station (₹15,000 - ₹50,000)",
        ],
      },
      {
        category: "Modern Technology",
        items: [
          "GPS Tracking System (₹20,000 - ₹1 Lakh)",
          "Drone for Crop Monitoring (₹50,000 - ₹3 Lakhs)",
          "Automated Greenhouse (₹5-20 Lakhs)",
          "Solar Panels for Farm (₹1-5 Lakhs)",
        ],
      },
    ];
  };

  // Detailed farming type information
  const getFarmingTypeDetails = (type: string) => {
    const details: Record<string, {
      title: string;
      description: string;
      keyFeatures: string[];
      benefits: string[];
      challenges: string[];
      bestFor: string[];
      articleUrl: string;
      articleTitle: string;
    }> = {
      "Subsistence Farming": {
        title: "Subsistence Farming",
        description: "Subsistence farming is a self-sufficiency farming system in which farmers focus on growing enough food to feed themselves and their families. The output is mostly for local requirements with little or no surplus trade.",
        keyFeatures: [
          "Small-scale farming operations",
          "Family labor intensive",
          "Diverse crop cultivation",
          "Low use of modern technology",
          "Traditional farming methods",
          "Food security focused"
        ],
        benefits: [
          "Food security for the family",
          "Low initial investment required",
          "Sustainable and eco-friendly",
          "Preserves traditional knowledge",
          "Reduces dependency on markets",
          "Flexible crop selection"
        ],
        challenges: [
          "Limited surplus for income",
          "Vulnerable to climate changes",
          "Limited access to modern technology",
          "Low productivity compared to commercial farming",
          "Limited market access"
        ],
        bestFor: [
          "Small landholdings (1-5 acres)",
          "Families seeking food security",
          "Rural areas with limited market access",
          "Traditional farming communities",
          "Beginners in agriculture"
        ],
        articleUrl: "https://www.fao.org/family-farming/detail/en/c/1200644/",
        articleTitle: "FAO Guide to Subsistence Farming"
      },
      "Commercial Farming": {
        title: "Commercial Farming",
        description: "Commercial farming is a large-scale farming operation focused on producing crops and livestock for sale in markets. It involves modern techniques, machinery, and aims for maximum profit through high yields and efficient production.",
        keyFeatures: [
          "Large-scale operations",
          "Market-oriented production",
          "Use of modern machinery and technology",
          "High capital investment",
          "Specialized crop cultivation",
          "Profit-driven approach"
        ],
        benefits: [
          "High income potential",
          "Economies of scale",
          "Access to modern technology",
          "Better market connections",
          "Higher productivity",
          "Employment generation"
        ],
        challenges: [
          "High initial investment required",
          "Market price fluctuations",
          "Need for technical expertise",
          "Environmental concerns",
          "Dependency on external inputs",
          "Risk management required"
        ],
        bestFor: [
          "Large landholdings (10+ acres)",
          "Farmers with capital investment",
          "Market-oriented individuals",
          "Experienced farmers",
          "Agricultural entrepreneurs"
        ],
        articleUrl: "https://www.investopedia.com/terms/c/commercial-farming.asp",
        articleTitle: "Understanding Commercial Farming"
      },
      "Organic Farming": {
        title: "Organic Farming",
        description: "Organic farming is an agricultural system that uses fertilizers of organic origin such as compost manure, green manure, and bone meal. It emphasizes techniques such as crop rotation and companion planting, avoiding synthetic pesticides and fertilizers.",
        keyFeatures: [
          "No synthetic chemicals",
          "Biological pest control",
          "Crop rotation and diversity",
          "Organic compost and manure",
          "Soil health focus",
          "Certification standards"
        ],
        benefits: [
          "Healthier produce",
          "Better soil quality",
          "Environmental protection",
          "Premium market prices",
          "Sustainable long-term",
          "Biodiversity conservation"
        ],
        challenges: [
          "Lower initial yields",
          "Higher labor requirements",
          "Certification costs",
          "Pest management complexity",
          "Longer transition period",
          "Market education needed"
        ],
        bestFor: [
          "Health-conscious consumers",
          "Environmentally aware farmers",
          "Premium market access",
          "Small to medium farms",
          "Sustainable agriculture advocates"
        ],
        articleUrl: "https://www.organicconsumers.org/news/organic-farming-benefits",
        articleTitle: "Benefits of Organic Farming"
      },
      "Mixed Farming": {
        title: "Mixed Farming",
        description: "Mixed farming is an agricultural system that combines crop cultivation with livestock rearing on the same farm. This integrated approach provides multiple income sources and creates a sustainable ecosystem where crops and animals support each other.",
        keyFeatures: [
          "Crop and livestock integration",
          "Diversified income sources",
          "Resource recycling",
          "Risk distribution",
          "Sustainable ecosystem",
          "Year-round production"
        ],
        benefits: [
          "Multiple income streams",
          "Reduced risk through diversification",
          "Natural fertilizer from livestock",
          "Better resource utilization",
          "Food security",
          "Sustainable farming system"
        ],
        challenges: [
          "Requires diverse skills",
          "Higher management complexity",
          "More initial investment",
          "Labor intensive",
          "Need for proper planning",
          "Market access for multiple products"
        ],
        bestFor: [
          "Medium to large farms (5-20 acres)",
          "Farmers seeking diversification",
          "Sustainable agriculture",
          "Families with livestock experience",
          "Integrated farming enthusiasts"
        ],
        articleUrl: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/mixed-farming",
        articleTitle: "Mixed Farming Systems"
      }
    };
    return details[type] || null;
  };

  // Detailed step information
  const getStepDetails = (stepTitle: string) => {
    const details: Record<string, {
      title: string;
      description: string;
      keyPoints: string[];
      methods: string[];
      tips: string[];
      tools: string[];
      articleUrl: string;
      articleTitle: string;
    }> = {
      "Land Preparation": {
        title: "Land Preparation",
        description: "Land preparation is the first and most crucial step in farming. It involves clearing, plowing, leveling, and preparing the soil to create optimal conditions for seed germination and plant growth. Proper land preparation ensures better water retention, nutrient distribution, and root development.",
        keyPoints: [
          "Clear all weeds, rocks, and debris from the field",
          "Plow the land to break up compacted soil",
          "Level the field for uniform water distribution",
          "Remove stumps and large obstacles",
          "Mark boundaries and plan field layout",
          "Prepare drainage systems if needed"
        ],
        methods: [
          "Traditional Plowing: Using bullocks or tractors with moldboard plows",
          "Deep Plowing: Breaking hardpan layers for better root penetration",
          "Minimum Tillage: Reducing soil disturbance for conservation",
          "Zero Tillage: Direct seeding without plowing (conservation agriculture)",
          "Raised Bed Preparation: Creating elevated beds for better drainage"
        ],
        tips: [
          "Plow when soil moisture is optimal (not too wet or dry)",
          "Allow 2-3 weeks between plowing and sowing for soil settling",
          "Use organic matter like compost during preparation",
          "Test soil pH and adjust before planting",
          "Plan irrigation channels during land preparation"
        ],
        tools: [
          "Plow (traditional or modern tractor-mounted)",
          "Harrow for breaking clods and leveling",
          "Cultivator for secondary tillage",
          "Leveler for uniform field surface",
          "Rotavator for fine seedbed preparation"
        ],
        articleUrl: "https://www.fao.org/3/y5146e/y5146e0a.htm",
        articleTitle: "FAO Guide to Land Preparation"
      },
      "Soil Testing": {
        title: "Soil Testing",
        description: "Soil testing is essential for understanding your soil's nutrient content, pH level, and overall health. It helps determine what amendments are needed, which crops are suitable, and how to optimize fertilizer use. Regular soil testing prevents over-fertilization and ensures sustainable farming practices.",
        keyPoints: [
          "Test pH levels (optimal range: 6.0-7.5 for most crops)",
          "Measure NPK (Nitrogen, Phosphorus, Potassium) levels",
          "Assess organic matter content",
          "Check micronutrient availability",
          "Evaluate soil texture (sand, silt, clay ratio)",
          "Test for salinity and alkalinity"
        ],
        methods: [
          "Laboratory Testing: Send samples to certified soil testing labs",
          "Home Testing Kits: Use pH meters and test strips for basic analysis",
          "Visual Assessment: Observe soil color, texture, and structure",
          "Plant Tissue Analysis: Test plant leaves for nutrient deficiencies",
          "Digital Soil Sensors: Use modern technology for real-time monitoring"
        ],
        tips: [
          "Collect samples from multiple locations and mix them",
          "Test soil 2-3 months before planting season",
          "Test at the same depth each time (usually 6-8 inches)",
          "Avoid testing immediately after fertilizer application",
          "Keep records of test results for comparison over time"
        ],
        tools: [
          "Soil sampling auger or spade",
          "pH meter or test strips",
          "Soil testing kit (NPK analyzer)",
          "Moisture meter",
          "EC meter for salinity testing"
        ],
        articleUrl: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health/soil-testing",
        articleTitle: "USDA Soil Testing Guide"
      },
      "Seed Selection": {
        title: "Seed Selection",
        description: "Choosing the right seeds is critical for successful farming. Quality seeds ensure better germination rates, disease resistance, and higher yields. Seed selection should be based on local climate, soil conditions, market demand, and farming goals.",
        keyPoints: [
          "Choose certified or quality-assured seeds",
          "Select varieties suitable for your region and climate",
          "Consider disease and pest resistance",
          "Check germination rate (should be >85%)",
          "Match seed type to your soil conditions",
          "Consider market demand and profitability"
        ],
        methods: [
          "Certified Seeds: Purchase from certified seed companies",
          "Open-Pollinated Varieties: Traditional varieties that can be saved",
          "Hybrid Seeds: High-yielding varieties (cannot save seeds)",
          "Heirloom Seeds: Traditional varieties with unique characteristics",
          "Organic Seeds: Certified organic, non-GMO seeds"
        ],
        tips: [
          "Buy seeds from reputable suppliers",
          "Check seed packaging for expiry date and germination rate",
          "Start with small quantities to test new varieties",
          "Consider local varieties adapted to your region",
          "Store seeds properly in cool, dry conditions",
          "Test germination before large-scale planting"
        ],
        tools: [
          "Seed germination test kit",
          "Magnifying glass for seed inspection",
          "Moisture meter for seed storage",
          "Seed treatment equipment",
          "Storage containers (airtight, moisture-proof)"
        ],
        articleUrl: "https://www.fao.org/3/y4311e/y4311e0a.htm",
        articleTitle: "FAO Seed Selection Guide"
      },
      "Irrigation Planning": {
        title: "Irrigation Planning",
        description: "Proper irrigation planning ensures your crops receive adequate water at the right time. It involves assessing water availability, choosing appropriate irrigation methods, and scheduling water application to maximize efficiency and minimize waste.",
        keyPoints: [
          "Assess water source availability (wells, rivers, rainfall)",
          "Calculate crop water requirements",
          "Choose appropriate irrigation method",
          "Plan irrigation schedule based on crop stage",
          "Design efficient water distribution system",
          "Consider water conservation techniques"
        ],
        methods: [
          "Drip Irrigation: Water delivered directly to plant roots (most efficient)",
          "Sprinkler Irrigation: Overhead water application",
          "Surface Irrigation: Flooding or furrow irrigation",
          "Subsurface Irrigation: Water applied below soil surface",
          "Rainwater Harvesting: Collecting and storing rainwater"
        ],
        tips: [
          "Irrigate early morning or evening to reduce evaporation",
          "Monitor soil moisture regularly",
          "Use mulching to reduce water loss",
          "Group crops with similar water needs",
          "Install water meters to track usage",
          "Consider drought-resistant crop varieties"
        ],
        tools: [
          "Drip irrigation system (pipes, emitters, filters)",
          "Sprinkler system (pipes, sprinklers, pumps)",
          "Water pump (submersible or surface)",
          "Moisture sensors",
          "Irrigation timer/controller",
          "Water storage tanks"
        ],
        articleUrl: "https://www.fao.org/3/y3918e/y3918e0a.htm",
        articleTitle: "FAO Irrigation Planning Guide"
      },
      "Crop Planning": {
        title: "Crop Planning",
        description: "Crop planning involves selecting crops, planning rotations, and scheduling planting to maximize yields, manage resources efficiently, and maintain soil health. Good crop planning considers market demand, seasonal patterns, and sustainable farming practices.",
        keyPoints: [
          "Select crops based on market demand and profitability",
          "Plan crop rotation to maintain soil fertility",
          "Schedule planting dates for optimal growth",
          "Plan intercropping for space efficiency",
          "Consider seasonal variations and climate",
          "Balance cash crops with food crops"
        ],
        methods: [
          "Crop Rotation: Alternating different crops in same field",
          "Intercropping: Growing multiple crops together",
          "Sequential Cropping: Growing crops one after another",
          "Mixed Cropping: Growing different crops simultaneously",
          "Relay Cropping: Planting next crop before harvesting previous"
        ],
        tips: [
          "Rotate crops from different families (legumes, cereals, vegetables)",
          "Plan for 3-4 year rotation cycles",
          "Include cover crops to improve soil health",
          "Consider crop compatibility in intercropping",
          "Plan for crop insurance and risk management",
          "Keep records of crop performance for future planning"
        ],
        tools: [
          "Crop planning calendar/software",
          "Field mapping tools",
          "Weather monitoring equipment",
          "Crop rotation planning charts",
          "Market price tracking tools"
        ],
        articleUrl: "https://www.fao.org/3/y5146e/y5146e0b.htm",
        articleTitle: "FAO Crop Planning and Rotation Guide"
      },
      "Marketing Strategy": {
        title: "Marketing Strategy",
        description: "A well-planned marketing strategy ensures you can sell your produce at profitable prices. It involves identifying target markets, understanding pricing, building relationships with buyers, and creating a sustainable sales channel for your agricultural products.",
        keyPoints: [
          "Identify target markets and buyers",
          "Research market prices and trends",
          "Build relationships with wholesalers, retailers, or direct consumers",
          "Plan for value-added products",
          "Consider online marketing and e-commerce",
          "Develop branding and quality standards"
        ],
        methods: [
          "Direct Marketing: Selling directly to consumers (farmers markets, CSAs)",
          "Wholesale: Selling to distributors and retailers",
          "Contract Farming: Pre-agreed contracts with buyers",
          "Online Marketing: E-commerce platforms and social media",
          "Value Addition: Processing raw produce into products",
          "Export Markets: Selling to international buyers"
        ],
        tips: [
          "Start building market relationships before harvest",
          "Diversify marketing channels to reduce risk",
          "Focus on quality to command premium prices",
          "Use social media for direct consumer connection",
          "Consider cooperative marketing with other farmers",
          "Keep records of sales and customer feedback"
        ],
        tools: [
          "Market research tools and price tracking",
          "Social media platforms for marketing",
          "E-commerce website or platform",
          "Packaging materials",
          "Transportation and logistics",
          "Accounting and sales tracking software"
        ],
        articleUrl: "https://www.fao.org/3/y5146e/y5146e0c.htm",
        articleTitle: "FAO Agricultural Marketing Guide"
      }
    };
    return details[stepTitle] || null;
  };

  // Detailed principle information
  const getPrincipleDetails = (principleTitle: string) => {
    const details: Record<string, {
      title: string;
      description: string;
      keyBenefits: string[];
      methods: string[];
      bestPractices: string[];
      commonMistakes: string[];
      articleUrl: string;
      articleTitle: string;
    }> = {
      "Crop Rotation": {
        title: "Crop Rotation",
        description: "Crop rotation is a systematic approach to growing different crops in the same area across different seasons or years. This practice helps maintain soil fertility, reduces pest and disease buildup, improves soil structure, and can increase crop yields over time.",
        keyBenefits: [
          "Prevents soil nutrient depletion by alternating nutrient-demanding crops",
          "Breaks pest and disease cycles naturally",
          "Improves soil structure and organic matter content",
          "Reduces weed pressure",
          "Increases biodiversity in farming systems",
          "Can improve crop yields by 10-25%"
        ],
        methods: [
          "Simple Rotation: Alternating 2-3 crops (e.g., corn → soybeans → wheat)",
          "Complex Rotation: 4+ crops in sequence for maximum benefits",
          "Legume Rotation: Including nitrogen-fixing crops like beans, peas, or clover",
          "Cover Crop Rotation: Planting cover crops between main crops",
          "Seasonal Rotation: Different crops for different seasons (kharif, rabi)"
        ],
        bestPractices: [
          "Plan 3-4 year rotation cycles for optimal results",
          "Group crops by family (avoid planting same family consecutively)",
          "Include legumes every 2-3 years to fix nitrogen",
          "Rotate deep-rooted with shallow-rooted crops",
          "Keep records of rotation history",
          "Consider market demand when planning rotations"
        ],
        commonMistakes: [
          "Planting same crop family consecutively",
          "Not planning ahead for multiple years",
          "Ignoring soil nutrient needs",
          "Not considering market timing",
          "Skipping cover crops in rotation"
        ],
        articleUrl: "https://www.fao.org/3/y5146e/y5146e0b.htm",
        articleTitle: "FAO Crop Rotation Guide"
      },
      "Water Management": {
        title: "Water Management",
        description: "Efficient water management is crucial for sustainable farming. It involves using water resources wisely through proper irrigation techniques, water conservation methods, and scheduling to ensure crops receive adequate moisture while minimizing waste and environmental impact.",
        keyBenefits: [
          "Reduces water usage by 30-50% with efficient systems",
          "Improves crop yields and quality",
          "Reduces waterlogging and soil erosion",
          "Lowers energy costs for pumping",
          "Prevents soil salinization",
          "Increases water use efficiency"
        ],
        methods: [
          "Drip Irrigation: Precise water delivery to plant roots (most efficient)",
          "Sprinkler Systems: Overhead water application for uniform coverage",
          "Furrow Irrigation: Water flows through channels between crop rows",
          "Flood Irrigation: Traditional method for rice and similar crops",
          "Subsurface Irrigation: Water applied below soil surface",
          "Rainwater Harvesting: Collecting and storing rainwater for use"
        ],
        bestPractices: [
          "Irrigate early morning or evening to reduce evaporation",
          "Monitor soil moisture regularly with sensors",
          "Use mulching to reduce water loss",
          "Group crops with similar water needs together",
          "Install water meters to track usage",
          "Schedule irrigation based on crop growth stage"
        ],
        commonMistakes: [
          "Over-irrigation leading to waterlogging",
          "Irrigating during peak heat (high evaporation)",
          "Not maintaining irrigation equipment",
          "Ignoring soil moisture levels",
          "Using inefficient irrigation methods"
        ],
        articleUrl: "https://www.fao.org/3/y3918e/y3918e0a.htm",
        articleTitle: "FAO Water Management in Agriculture"
      },
      "Organic Matter": {
        title: "Organic Matter",
        description: "Organic matter in soil is essential for healthy plant growth. It improves soil structure, water retention, nutrient availability, and supports beneficial soil microorganisms. Maintaining adequate organic matter (2-5%) is key to sustainable and productive farming.",
        keyBenefits: [
          "Improves soil structure and aeration",
          "Increases water-holding capacity",
          "Provides essential nutrients to plants",
          "Supports beneficial soil microorganisms",
          "Reduces soil erosion",
          "Buffers soil pH and reduces toxicity"
        ],
        methods: [
          "Composting: Decomposing organic waste into nutrient-rich compost",
          "Green Manure: Growing and plowing under cover crops",
          "Farmyard Manure: Using animal waste as fertilizer",
          "Crop Residues: Leaving crop remains in field to decompose",
          "Biochar: Adding charcoal to improve soil properties",
          "Vermicomposting: Using earthworms to create compost"
        ],
        bestPractices: [
          "Aim for 2-5% organic matter in soil",
          "Add organic matter regularly, not just once",
          "Mix different types of organic matter",
          "Apply compost before planting season",
          "Test soil organic matter levels annually",
          "Use crop residues as mulch or incorporate into soil"
        ],
        commonMistakes: [
          "Adding too much fresh manure (can burn plants)",
          "Not composting before application",
          "Ignoring organic matter levels",
          "Using contaminated organic materials",
          "Not maintaining organic matter over time"
        ],
        articleUrl: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health/soil-health-management",
        articleTitle: "USDA Soil Organic Matter Management"
      },
      "Pest Management": {
        title: "Pest Management",
        description: "Integrated Pest Management (IPM) is an ecosystem-based strategy that focuses on long-term prevention of pests through a combination of biological, cultural, physical, and chemical control methods. IPM minimizes risks to human health and the environment while effectively managing pests.",
        keyBenefits: [
          "Reduces pesticide use and costs",
          "Minimizes environmental impact",
          "Prevents pest resistance to chemicals",
          "Protects beneficial insects and biodiversity",
          "Maintains crop quality and yield",
          "Reduces health risks from pesticide exposure"
        ],
        methods: [
          "Biological Control: Using natural predators, parasites, or pathogens",
          "Cultural Control: Crop rotation, intercropping, and sanitation",
          "Physical Control: Traps, barriers, and manual removal",
          "Chemical Control: Targeted pesticide use as last resort",
          "Genetic Control: Using pest-resistant crop varieties",
          "Habitat Management: Creating environments unfavorable to pests"
        ],
        bestPractices: [
          "Monitor pest populations regularly",
          "Identify pests correctly before treatment",
          "Use economic thresholds to decide when to act",
          "Combine multiple control methods",
          "Preserve beneficial insects and natural enemies",
          "Rotate pesticides to prevent resistance"
        ],
        commonMistakes: [
          "Overusing chemical pesticides",
          "Not identifying pests correctly",
          "Ignoring beneficial insects",
          "Spraying preventively without monitoring",
          "Not rotating control methods"
        ],
        articleUrl: "https://www.fao.org/3/y4311e/y4311e0b.htm",
        articleTitle: "FAO Integrated Pest Management Guide"
      }
    };
    return details[principleTitle] || null;
  };

  // Background image URLs for different sections
  const backgroundImages = {
    knowledge: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop&q=80",
    region: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=800&fit=crop&q=80",
    budget: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop&q=80",
    soil: "https://images.unsplash.com/photo-1610878180933-123728745d22?w=1200&h=800&fit=crop&q=80",
    analysis: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=800&fit=crop&q=80",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/40 via-white to-orange-50/40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-orange-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      <main className="flex-1 relative z-10">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 py-8 overflow-hidden" ref={headerRef}>
          {/* Background image with overlay */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=400&fit=crop&q=80" 
              alt="Farming background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 via-amber-500/80 to-orange-600/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 backdrop-blur-sm"
                    onClick={() => navigate("/farm-academy")}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </motion.div>
                <div>
                  <motion.h1
                    className="text-2xl font-bold text-white md:text-3xl drop-shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Expert Q&A & Agricultural Guide
                  </motion.h1>
                  <motion.p
                    className="text-white/95 drop-shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Complete farming knowledge and personalized guidance
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="border-b bg-white py-4">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex items-center justify-between overflow-x-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <motion.div
                    key={step.id}
                    variants={itemVariants}
                    className={`flex flex-col items-center gap-2 min-w-[120px] cursor-pointer ${
                      isActive ? "text-orange-600" : isCompleted ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !isActive && isCompleted && setCurrentStep(step.id)}
                  >
                    <motion.div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        isActive
                          ? "border-orange-600 bg-orange-100 shadow-lg shadow-orange-200"
                          : isCompleted
                          ? "border-emerald-600 bg-emerald-100"
                          : "border-muted-foreground bg-muted"
                      }`}
                      animate={{
                        scale: isActive ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isActive ? Infinity : 0,
                        repeatDelay: 2,
                      }}
                    >
                      <StepIcon className="h-5 w-5" />
                    </motion.div>
                    <span className="text-xs font-medium text-center hidden sm:block">{step.title}</span>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12 relative">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <AnimatePresence mode="wait">
              {/* Step 0: Knowledge Hub */}
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6 relative"
                >
                  {/* Enhanced Background with multiple layers */}
                  <div className="absolute inset-0 opacity-[0.12] pointer-events-none rounded-lg overflow-hidden">
                    <img 
                      src={backgroundImages.knowledge}
                      alt="Agricultural knowledge"
                      className="w-full h-full object-cover scale-110 brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-orange-50/25 to-green-50/30"></div>
                  </div>
                  
                  {/* Floating agricultural icons */}
                  <div className="absolute inset-0 pointer-events-none opacity-15">
                    <motion.div
                      className="absolute top-10 right-20"
                      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Wheat className="h-16 w-16 text-green-600" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-20 left-10"
                      animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    >
                      <Sprout className="h-20 w-20 text-emerald-600" />
                    </motion.div>
                    <motion.div
                      className="absolute top-1/2 right-10"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <TreePine className="h-14 w-14 text-green-700" />
                    </motion.div>
                  </div>
                  
                  {/* Main Header Card */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-2 border-orange-200/60 bg-white/95 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 opacity-[0.03]">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                          <div className="flex items-center gap-4">
                            <motion.div
                              className="relative"
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            >
                              <div className="absolute inset-0 bg-orange-400/40 rounded-full blur-2xl opacity-60"></div>
                              <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 p-4 rounded-2xl shadow-xl border border-orange-300/30">
                                <BookOpen className="h-8 w-8 text-white drop-shadow-md" />
                              </div>
                            </motion.div>
                            <div>
                              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
                                Agricultural Knowledge Hub
                              </h2>
                              <p className="text-lg text-foreground/75 font-semibold">
                                Your Complete Guide to Modern Farming & Agricultural Excellence
                              </p>
                            </div>
                          </div>
                          
                          {/* Quick Stats */}
                          <div className="flex gap-3">
                            <motion.div
                              className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 backdrop-blur-sm rounded-xl border-2 border-orange-200/60 shadow-lg hover:shadow-xl transition-shadow"
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="text-2xl font-extrabold text-orange-700">500+</div>
                              <div className="text-xs text-foreground/70 font-semibold mt-1">Topics</div>
                            </motion.div>
                            <motion.div
                              className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm rounded-xl border-2 border-green-200/60 shadow-lg hover:shadow-xl transition-shadow"
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <div className="text-2xl font-extrabold text-green-700">1000+</div>
                              <div className="text-xs text-foreground/70 font-semibold mt-1">Farmers</div>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Feature Pills */}
                        <motion.div
                          className="flex flex-wrap gap-3 mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {[
                            { icon: GraduationCap, text: "Expert Courses", color: "blue", bg: "from-blue-50 to-cyan-50", border: "border-blue-300/60", iconColor: "text-blue-700" },
                            { icon: Video, text: "Video Tutorials", color: "purple", bg: "from-purple-50 to-pink-50", border: "border-purple-300/60", iconColor: "text-purple-700" },
                            { icon: Lightbulb, text: "Innovation Hub", color: "yellow", bg: "from-yellow-50 to-amber-50", border: "border-yellow-300/60", iconColor: "text-yellow-700" },
                            { icon: Target, text: "Practical Guides", color: "red", bg: "from-red-50 to-rose-50", border: "border-red-300/60", iconColor: "text-red-700" },
                          ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                              <motion.div
                                key={idx}
                                className={`flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r ${feature.bg} backdrop-blur-sm rounded-full border-2 ${feature.border} shadow-md hover:shadow-lg transition-all`}
                                whileHover={{ scale: 1.08, y: -2 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + idx * 0.1 }}
                              >
                                <Icon className={`h-4 w-4 ${feature.iconColor}`} />
                                <span className="text-sm font-semibold text-foreground">{feature.text}</span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                  
                  {/* Enhanced Tabs Section */}
                  <Card className="border-2 border-orange-200/50 bg-white/98 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100/15 to-orange-100/15 rounded-bl-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-100/15 to-yellow-100/15 rounded-tr-full -ml-24 -mb-24 blur-3xl"></div>
                    
                    <div className="relative z-10">
                      <Tabs defaultValue="basics" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 h-14 bg-gradient-to-r from-slate-50 to-gray-50 p-1.5 rounded-xl border-2 border-slate-200/60 shadow-inner">
                          <TabsTrigger 
                            value="basics" 
                            className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-orange-700 data-[state=active]:border-orange-300 font-bold rounded-lg transition-all border-2 border-transparent data-[state=active]:scale-[1.02]"
                          >
                            <Sprout className="h-4 w-4 mr-2" />
                            Basics
                          </TabsTrigger>
                          <TabsTrigger 
                            value="soil" 
                            className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 data-[state=active]:border-blue-300 font-bold rounded-lg transition-all border-2 border-transparent data-[state=active]:scale-[1.02]"
                          >
                            <FlaskConical className="h-4 w-4 mr-2" />
                            Soil Science
                          </TabsTrigger>
                          <TabsTrigger 
                            value="startups" 
                            className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-emerald-700 data-[state=active]:border-emerald-300 font-bold rounded-lg transition-all border-2 border-transparent data-[state=active]:scale-[1.02]"
                          >
                            <Rocket className="h-4 w-4 mr-2" />
                            Startups
                          </TabsTrigger>
                          <TabsTrigger 
                            value="accessories" 
                            className="data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-purple-700 data-[state=active]:border-purple-300 font-bold rounded-lg transition-all border-2 border-transparent data-[state=active]:scale-[1.02]"
                          >
                            <Wrench className="h-4 w-4 mr-2" />
                            Accessories
                          </TabsTrigger>
                        </TabsList>

                      {/* Basics Tab - Completely Redesigned */}
                      <TabsContent value="basics" className="space-y-6 relative">
                        {/* Hero Section for Basics */}
                        <motion.div
                          className="relative rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="relative h-48 overflow-hidden rounded-2xl shadow-2xl">
                            <img 
                              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=300&fit=crop&q=80"
                              alt="Farming"
                              className="w-full h-full object-cover opacity-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/35"></div>
                            <div className="relative z-10 p-6 text-white">
                              <motion.div
                                className="flex items-center gap-3 mb-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
                                  <Sprout className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-xl tracking-tight">Getting Started with Agriculture</h3>
                              </motion.div>
                              <p className="text-white/95 drop-shadow-lg text-sm md:text-base font-semibold max-w-2xl">
                                Your journey to successful farming begins here. Learn the fundamentals and build a solid foundation.
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Farming Types Grid */}
                        <div>
                          <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                            Choose Your Farming Type
                          </h4>
                          <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {[
                              { 
                                icon: Heart, 
                                title: "Subsistence Farming", 
                                desc: "Growing food for your family", 
                                bgClass: "from-red-50 to-pink-50",
                                borderClass: "border-red-200",
                                iconBgClass: "bg-red-100",
                                iconColorClass: "text-red-600"
                              },
                              { 
                                icon: DollarSign, 
                                title: "Commercial Farming", 
                                desc: "Growing crops for profit and business", 
                                bgClass: "from-green-50 to-emerald-50",
                                borderClass: "border-green-200",
                                iconBgClass: "bg-green-100",
                                iconColorClass: "text-green-600"
                              },
                              { 
                                icon: Leaf, 
                                title: "Organic Farming", 
                                desc: "Chemical-free, sustainable farming practices", 
                                bgClass: "from-emerald-50 to-teal-50",
                                borderClass: "border-emerald-200",
                                iconBgClass: "bg-emerald-100",
                                iconColorClass: "text-emerald-600"
                              },
                              { 
                                icon: Package, 
                                title: "Mixed Farming", 
                                desc: "Combining crops with livestock for maximum yield", 
                                bgClass: "from-orange-50 to-amber-50",
                                borderClass: "border-orange-200",
                                iconBgClass: "bg-orange-100",
                                iconColorClass: "text-orange-600"
                              },
                            ].map((type, idx) => {
                              const Icon = type.icon;
                              return (
                                <motion.div
                                  key={idx}
                                  variants={itemVariants}
                                  whileHover={{ scale: 1.02, y: -3 }}
                                  className={`rounded-xl border-2 ${type.borderClass} bg-gradient-to-br ${type.bgClass} p-5 cursor-pointer shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group backdrop-blur-sm`}
                                >
                                  {/* Decorative corner */}
                                  <div className={`absolute top-0 right-0 w-24 h-24 ${type.iconBgClass} rounded-bl-full opacity-15 group-hover:opacity-25 transition-opacity blur-sm`}></div>
                                  
                                  <div className="relative z-10">
                                    <div className="flex items-start gap-4 mb-3">
                                      <motion.div
                                        className={`${type.iconBgClass} p-3.5 rounded-xl shadow-md border border-white/50`}
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                      >
                                        <Icon className={`h-6 w-6 ${type.iconColorClass}`} />
                                      </motion.div>
                                      <div className="flex-1">
                                        <h5 className="font-extrabold text-lg text-foreground mb-1.5 tracking-tight">{type.title}</h5>
                                        <p className="text-sm text-foreground/75 font-medium leading-relaxed">{type.desc}</p>
                                      </div>
                                    </div>
                                    <motion.button
                                      onClick={() => setSelectedFarmingType(type.title)}
                                      className="flex items-center gap-2 text-xs text-foreground/70 font-semibold bg-white/60 hover:bg-white/80 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all cursor-pointer w-full text-left group"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <TrendingUp className="h-3.5 w-3.5 group-hover:text-orange-600 transition-colors" />
                                      <span className="group-hover:text-orange-600 transition-colors">Learn more about {type.title.toLowerCase()}</span>
                                    </motion.button>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </div>

                        {/* Essential Steps */}
                        <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/90 rounded-2xl p-7 border-2 border-blue-200/60 relative overflow-hidden backdrop-blur-sm shadow-lg">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/15 rounded-bl-full -mr-20 -mt-20 blur-xl"></div>
                          <div className="relative z-10">
                            <h4 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-3">
                              <div className="w-1.5 h-7 bg-blue-600 rounded-full shadow-md"></div>
                              Essential Steps to Start Your Farming Journey
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                { step: "1", title: "Land Preparation", desc: "Clear, plow, and level your land", icon: Package },
                                { step: "2", title: "Soil Testing", desc: "Test pH, nutrients, and organic matter", icon: FlaskConical },
                                { step: "3", title: "Seed Selection", desc: "Choose quality seeds suitable for your region", icon: Sprout },
                                { step: "4", title: "Irrigation Planning", desc: "Ensure adequate water supply", icon: Droplets },
                                { step: "5", title: "Crop Planning", desc: "Plan crop rotation and intercropping", icon: Target },
                                { step: "6", title: "Marketing Strategy", desc: "Identify buyers and markets", icon: Store },
                              ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setSelectedStep(item.title)}
                                    className="flex items-start gap-4 p-5 bg-white/90 backdrop-blur-md rounded-xl border-2 border-blue-200/50 shadow-md hover:shadow-lg transition-all hover:border-blue-300/70 cursor-pointer group"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="flex-shrink-0">
                                      <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center font-extrabold shadow-lg border border-blue-400/30 group-hover:scale-110 transition-transform">
                                        {item.step}
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2.5 mb-2">
                                        <Icon className="h-4.5 w-4.5 text-blue-700 group-hover:text-blue-800 transition-colors" />
                                        <h5 className="font-bold text-foreground text-base group-hover:text-blue-700 transition-colors">{item.title}</h5>
                                      </div>
                                      <p className="text-sm text-foreground/75 font-medium leading-relaxed">{item.desc}</p>
                                      <div className="mt-3 flex items-center gap-2 text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        <span>Click to learn more</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Key Farming Principles */}
                        <div>
                          <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                            Key Farming Principles for Success
                          </h4>
                          <motion.div
                            className="grid gap-4 md:grid-cols-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {[
                              { 
                                icon: Sun, 
                                title: "Crop Rotation", 
                                desc: "Rotate crops to maintain soil fertility and reduce pests", 
                                borderClass: "border-orange-200",
                                bgClass: "from-orange-50 to-white",
                                iconBgClass: "bg-orange-100",
                                iconColorClass: "text-orange-600",
                                hoverBgClass: "group-hover:bg-orange-100/10",
                                tips: "Plan 3-4 year rotation cycles" 
                              },
                              { 
                                icon: Droplets, 
                                title: "Water Management", 
                                desc: "Use efficient irrigation methods like drip or sprinkler", 
                                borderClass: "border-blue-200",
                                bgClass: "from-blue-50 to-white",
                                iconBgClass: "bg-blue-100",
                                iconColorClass: "text-blue-600",
                                hoverBgClass: "group-hover:bg-blue-100/10",
                                tips: "Save 30-50% water with drip irrigation" 
                              },
                              { 
                                icon: Leaf, 
                                title: "Organic Matter", 
                                desc: "Add compost and manure to improve soil health", 
                                borderClass: "border-green-200",
                                bgClass: "from-green-50 to-white",
                                iconBgClass: "bg-green-100",
                                iconColorClass: "text-green-600",
                                hoverBgClass: "group-hover:bg-green-100/10",
                                tips: "Aim for 2-5% organic matter" 
                              },
                              { 
                                icon: Wind, 
                                title: "Pest Management", 
                                desc: "Use integrated pest management (IPM) techniques", 
                                borderClass: "border-purple-200",
                                bgClass: "from-purple-50 to-white",
                                iconBgClass: "bg-purple-100",
                                iconColorClass: "text-purple-600",
                                hoverBgClass: "group-hover:bg-purple-100/10",
                                tips: "Combine biological and chemical methods" 
                              },
                            ].map((principle, idx) => {
                              const Icon = principle.icon;
                              return (
                                <motion.div
                                  key={idx}
                                  variants={cardHoverVariants}
                                  initial="rest"
                                  whileHover="hover"
                                  onClick={() => setSelectedPrinciple(principle.title)}
                                  className={`rounded-xl border-2 ${principle.borderClass} bg-gradient-to-br ${principle.bgClass} p-5.5 cursor-pointer shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group backdrop-blur-sm`}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {/* Animated background */}
                                  <div className={`absolute inset-0 bg-transparent ${principle.hoverBgClass} transition-colors duration-300`}></div>
                                  
                                  <div className="relative z-10">
                                    <div className="flex items-center gap-3.5 mb-3.5">
                                      <motion.div
                                        className={`${principle.iconBgClass} p-3.5 rounded-xl shadow-md border border-white/50`}
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
                                      >
                                        <Icon className={`h-5.5 w-5.5 ${principle.iconColorClass}`} />
                                      </motion.div>
                                      <h5 className="font-extrabold text-lg text-foreground tracking-tight group-hover:text-orange-700 transition-colors">{principle.title}</h5>
                                    </div>
                                    <p className="text-sm text-foreground/75 mb-3.5 font-medium leading-relaxed">{principle.desc}</p>
                                    <div className="flex items-center gap-2.5 text-xs text-foreground/70 bg-white/70 backdrop-blur-sm rounded-lg px-3.5 py-2 border border-white/50 shadow-sm mb-2">
                                      <Lightbulb className="h-3.5 w-3.5" />
                                      <span className="font-semibold">{principle.tips}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-foreground/60 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                      <TrendingUp className="h-3.5 w-3.5" />
                                      <span>Click to learn more</span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        </div>
                      </TabsContent>

                      {/* Soil Science Tab - Enhanced */}
                      <TabsContent value="soil" className="space-y-6 relative">
                        {/* Hero Section */}
                        <motion.div
                          className="relative rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="relative h-40 overflow-hidden rounded-2xl shadow-2xl">
                            <img 
                              src="https://images.unsplash.com/photo-1610878180933-123728745d22?w=1200&h=300&fit=crop&q=80"
                              alt="Soil science"
                              className="w-full h-full object-cover opacity-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/35"></div>
                            <div className="relative z-10 p-6 text-white">
                              <motion.div
                                className="flex items-center gap-3 mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
                                  <FlaskConical className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-xl tracking-tight">Understanding Soil Science</h3>
                              </motion.div>
                              <p className="text-white/95 drop-shadow-lg text-sm font-semibold max-w-2xl">
                                Discover the secrets beneath your feet and unlock the potential of your soil
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Soil Types Grid */}
                        <div>
                          <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                            Soil Types in India
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {soilTypes.map((soil, idx) => {
                              const soilInfo: Record<string, { desc: string; crops: string; region: string }> = {
                                "Alluvial Soil": { 
                                  desc: "Rich in nutrients, ideal for rice, wheat, and sugarcane", 
                                  crops: "Rice, Wheat, Sugarcane",
                                  region: "Indo-Gangetic plains"
                                },
                                "Black Soil (Regur)": { 
                                  desc: "High clay content, excellent for cotton and oilseeds", 
                                  crops: "Cotton, Oilseeds",
                                  region: "Deccan Plateau"
                                },
                                "Red Soil": { 
                                  desc: "Low fertility, needs organic matter. Good for millets and pulses", 
                                  crops: "Millets, Pulses",
                                  region: "Peninsular India"
                                },
                                "Laterite Soil": { 
                                  desc: "Acidic, suitable for tea, coffee, and cashew", 
                                  crops: "Tea, Coffee, Cashew",
                                  region: "High rainfall areas"
                                },
                                "Mountain Soil": { 
                                  desc: "Variable fertility, good for fruits and vegetables", 
                                  crops: "Fruits, Vegetables",
                                  region: "Hilly regions"
                                },
                                "Desert Soil": { 
                                  desc: "Low organic matter, needs irrigation for cultivation", 
                                  crops: "Dates, Millets",
                                  region: "Arid regions"
                                },
                                "Saline & Alkaline Soil": { 
                                  desc: "Needs reclamation before farming", 
                                  crops: "Salt-tolerant crops",
                                  region: "Coastal and arid areas"
                                },
                                "Peaty & Marshy Soil": { 
                                  desc: "Rich in organic matter but needs drainage", 
                                  crops: "Rice, Vegetables",
                                  region: "Waterlogged areas"
                                },
                              };
                              const info = soilInfo[soil] || { desc: "", crops: "", region: "" };
                              
                              return (
                                <motion.div
                                  key={soil}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  whileHover={{ scale: 1.02, y: -3 }}
                                  className="rounded-xl border-2 border-blue-200/60 bg-gradient-to-br from-blue-50/95 to-cyan-50/95 p-5.5 cursor-pointer shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group backdrop-blur-sm"
                                >
                                  {/* Decorative elements */}
                                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-100/20 rounded-bl-full -mr-14 -mt-14 blur-xl"></div>
                                  <div className="relative z-10">
                                    <div className="flex items-start gap-3.5 mb-3.5">
                                      <motion.div
                                        className="bg-blue-100 p-3.5 rounded-xl shadow-md border border-blue-200/50"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                      >
                                        <Leaf className="h-5.5 w-5.5 text-blue-700" />
                                      </motion.div>
                                      <div className="flex-1">
                                        <h5 className="font-extrabold text-lg text-foreground mb-1.5 tracking-tight">{soil}</h5>
                                        <p className="text-xs text-blue-700 font-bold mb-2 bg-blue-50 px-2.5 py-1 rounded-md inline-block">📍 {info.region}</p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-foreground/75 mb-3.5 font-medium leading-relaxed">{info.desc}</p>
                                    <div className="flex items-center gap-2.5 text-xs bg-white/70 backdrop-blur-sm rounded-lg px-3.5 py-2 border border-green-200/50 shadow-sm">
                                      <Sprout className="h-3.5 w-3.5 text-green-700" />
                                      <span className="font-semibold text-foreground">Best for: {info.crops}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Soil Testing Parameters */}
                        <div className="bg-gradient-to-br from-indigo-50/90 to-purple-50/90 rounded-2xl p-7 border-2 border-indigo-200/60 relative overflow-hidden backdrop-blur-sm shadow-lg">
                          <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-200/15 rounded-bl-full -mr-22 -mt-22 blur-xl"></div>
                          <div className="relative z-10">
                            <h4 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-3">
                              <div className="w-1.5 h-7 bg-indigo-600 rounded-full shadow-md"></div>
                              Soil Testing Parameters
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {[
                                { param: "pH Level", value: "6.0-7.5", desc: "Ideal range for most crops", icon: Activity },
                                { param: "Nitrogen (N)", value: "Essential", desc: "For leaf growth and green color", icon: Leaf },
                                { param: "Phosphorus (P)", value: "Important", desc: "For root development", icon: Leaf },
                                { param: "Potassium (K)", value: "Vital", desc: "For overall plant health", icon: Heart },
                                { param: "Organic Matter", value: "2-5%", desc: "For healthy soil structure", icon: Package },
                                { param: "Micronutrients", value: "Required", desc: "Iron, zinc, manganese, etc.", icon: Sparkles },
                              ].map((test, idx) => {
                                const Icon = test.icon;
                                return (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4.5 bg-white/90 backdrop-blur-md rounded-xl border-2 border-indigo-200/50 shadow-md hover:shadow-lg transition-all hover:border-indigo-300/70"
                                  >
                                    <div className="bg-indigo-100 p-2.5 rounded-xl shadow-sm border border-indigo-200/50">
                                      <Icon className="h-5.5 w-5.5 text-indigo-700" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <h5 className="font-bold text-foreground text-base">{test.param}</h5>
                                        <Badge className="bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-300/50 px-2.5 py-0.5">{test.value}</Badge>
                                      </div>
                                      <p className="text-xs text-foreground/75 font-medium leading-relaxed">{test.desc}</p>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Startups Tab - Enhanced */}
                      <TabsContent value="startups" className="space-y-6 relative">
                        {/* Hero Section */}
                        <motion.div
                          className="relative rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="relative h-40 overflow-hidden rounded-2xl shadow-2xl">
                            <img 
                              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop&q=80"
                              alt="Startups"
                              className="w-full h-full object-cover opacity-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/35"></div>
                            <div className="relative z-10 p-6 text-white">
                              <motion.div
                                className="flex items-center gap-3 mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
                                  <Rocket className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-xl tracking-tight">Agricultural Startup Ideas</h3>
                              </motion.div>
                              <p className="text-white/95 drop-shadow-lg text-sm font-semibold max-w-2xl">
                                Transform your agricultural passion into a profitable business venture
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Startup Ideas Grid */}
                        <div>
                          <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                            Explore Profitable Agricultural Ventures
                          </h4>
                          <motion.div
                            className="grid gap-5 md:grid-cols-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {getStartupIdeas().map((startup, index) => (
                              <motion.div
                                key={index}
                                variants={cardHoverVariants}
                                initial="rest"
                                whileHover="hover"
                                className="relative"
                              >
                                <Card className="border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50/95 to-white p-6.5 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl transition-all group backdrop-blur-sm">
                                  {/* Decorative elements */}
                                  <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/20 rounded-bl-full -mr-18 -mt-18 blur-xl"></div>
                                  <div className="absolute bottom-0 left-0 w-28 h-28 bg-teal-100/15 rounded-tr-full -ml-14 -mb-14 blur-xl"></div>
                                  
                                  <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-3.5">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3.5 mb-2.5">
                                          <motion.div
                                            className="bg-emerald-100 p-3 rounded-xl shadow-md border border-emerald-200/50"
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                          >
                                            <Rocket className="h-5.5 w-5.5 text-emerald-700" />
                                          </motion.div>
                                          <h4 className="font-extrabold text-lg text-foreground tracking-tight">{startup.title}</h4>
                                        </div>
                                        <p className="text-sm text-foreground/75 mb-4.5 leading-relaxed font-medium">{startup.description}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className="bg-emerald-100 p-2.5 rounded-xl shadow-sm border border-emerald-200/50">
                                          <DollarSign className="h-4.5 w-4.5 text-emerald-700" />
                                        </div>
                                        <div>
                                          <p className="text-xs text-muted-foreground font-semibold">Investment Required</p>
                                          <p className="font-extrabold text-foreground text-base">{startup.investment}</p>
                                        </div>
                                      </div>
                                      <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                      >
                                        <Badge className={`text-sm px-3.5 py-1.5 font-bold ${startup.potential === "Very High" ? "bg-emerald-100 text-emerald-800 border-emerald-400" : "bg-blue-100 text-blue-800 border-blue-400"} border-2 shadow-sm`}>
                                          {startup.potential}
                                        </Badge>
                                      </motion.div>
                                    </div>
                                    
                                    <div className="mt-4.5 pt-4.5 border-t-2 border-emerald-200/50">
                                      <div className="flex items-center gap-2.5 text-xs text-emerald-700 bg-emerald-50/70 px-3 py-2 rounded-lg backdrop-blur-sm border border-emerald-200/50">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        <span className="font-bold">High growth potential in agricultural sector</span>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        {/* Success Tips */}
                        <div className="bg-gradient-to-br from-yellow-50/90 to-amber-50/90 rounded-2xl p-7 border-2 border-yellow-200/60 relative overflow-hidden backdrop-blur-sm shadow-lg">
                          <div className="absolute top-0 right-0 w-44 h-44 bg-yellow-200/15 rounded-bl-full -mr-22 -mt-22 blur-xl"></div>
                          <div className="relative z-10">
                            <h4 className="text-xl font-extrabold text-foreground mb-5 flex items-center gap-3">
                              <div className="p-2 bg-yellow-100 rounded-xl shadow-md border border-yellow-300/50">
                                <Lightbulb className="h-5 w-5 text-yellow-700" />
                              </div>
                              Startup Success Tips
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {[
                                "Start with market research and identify gaps",
                                "Begin with a small-scale pilot project",
                                "Build strong partnerships with farmers",
                                "Focus on technology and innovation",
                                "Ensure proper licensing and compliance",
                                "Develop a solid business plan and financial model",
                              ].map((tip, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start gap-3 p-3.5 bg-white/90 backdrop-blur-md rounded-lg border-2 border-yellow-200/50 shadow-md hover:shadow-lg transition-all hover:border-yellow-300/70"
                                >
                                  <CheckCircle2 className="h-4.5 w-4.5 text-yellow-700 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium leading-relaxed">{tip}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Government Schemes for Agricultural Startups */}
                        <div className="bg-gradient-to-br from-indigo-50/90 to-blue-50/90 rounded-2xl p-7 border-2 border-indigo-200/60 relative overflow-hidden backdrop-blur-sm shadow-lg">
                          <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-200/15 rounded-bl-full -mr-22 -mt-22 blur-xl"></div>
                          <div className="relative z-10">
                            <h4 className="text-xl font-extrabold text-foreground mb-5 flex items-center gap-3">
                              <div className="p-2 bg-indigo-100 rounded-xl shadow-md border border-indigo-300/50">
                                <Shield className="h-5 w-5 text-indigo-700" />
                              </div>
                              Government Schemes for Agricultural Startups
                            </h4>
                            <div className="space-y-4">
                              {/* Central Government Schemes */}
                              <div>
                                <h5 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                  <Award className="h-4 w-4 text-indigo-600" />
                                  Central Government Schemes
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    {
                                      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
                                      description: "Direct income support of ₹6,000 per year to farmers in three equal installments",
                                      subsidy: "₹6,000/year",
                                      link: "https://pmkisan.gov.in/",
                                      type: "Central"
                                    },
                                    {
                                      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
                                      description: "Crop insurance scheme providing financial support to farmers in case of crop loss",
                                      subsidy: "Premium subsidy up to 90%",
                                      link: "https://pmfby.gov.in/",
                                      type: "Central"
                                    },
                                    {
                                      title: "Kisan Credit Card (KCC)",
                                      description: "Credit facility for farmers with interest subvention and flexible repayment options",
                                      subsidy: "Interest subvention 2%",
                                      link: "https://www.india.gov.in/kisan-credit-card-kcc",
                                      type: "Central"
                                    },
                                    {
                                      title: "Startup India Seed Fund Scheme",
                                      description: "Financial assistance for proof of concept, prototype development, product trials, market entry",
                                      subsidy: "Up to ₹20 Lakhs",
                                      link: "https://www.startupindia.gov.in/content/sih/en/government-schemes/seed-fund-scheme.html",
                                      type: "Central"
                                    },
                                    {
                                      title: "MUDRA Yojana",
                                      description: "Micro Units Development & Refinance Agency provides loans up to ₹10 lakhs for small businesses",
                                      subsidy: "Up to ₹10 Lakhs",
                                      link: "https://www.mudra.org.in/",
                                      type: "Central"
                                    },
                                    {
                                      title: "Stand-Up India Scheme",
                                      description: "Bank loans between ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs",
                                      subsidy: "Up to ₹1 Crore",
                                      link: "https://www.standupmitra.in/",
                                      type: "Central"
                                    },
                                    {
                                      title: "National Horticulture Mission",
                                      description: "Promotes holistic growth of horticulture sector including organic farming",
                                      subsidy: "Subsidy up to 50%",
                                      link: "https://www.nhm.nic.in/",
                                      type: "Central"
                                    },
                                    {
                                      title: "Rashtriya Krishi Vikas Yojana (RKVY)",
                                      description: "State plan scheme for agriculture and allied sectors development",
                                      subsidy: "Varies by state",
                                      link: "https://rkvy.nic.in/",
                                      type: "Central"
                                    }
                                  ].map((scheme, idx) => (
                                    <motion.a
                                      key={idx}
                                      href={scheme.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      whileHover={{ scale: 1.02, y: -2 }}
                                      className="block"
                                    >
                                      <Card className="p-4 bg-white/90 backdrop-blur-md rounded-xl border-2 border-indigo-200/50 shadow-md hover:shadow-lg transition-all hover:border-indigo-300/70 cursor-pointer group">
                                        <div className="flex items-start gap-3">
                                          <div className="bg-indigo-100 p-2.5 rounded-xl shadow-sm border border-indigo-200/50 group-hover:bg-indigo-200 transition-colors">
                                            <Shield className="h-4.5 w-4.5 text-indigo-700" />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1.5">
                                              <h5 className="font-bold text-foreground text-sm">{scheme.title}</h5>
                                              <Badge className="bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-300/50">
                                                {scheme.type}
                                              </Badge>
                                            </div>
                                            <p className="text-xs text-foreground/75 font-medium leading-relaxed mb-2">{scheme.description}</p>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-md">
                                                <DollarSign className="h-3 w-3" />
                                                <span>{scheme.subsidy}</span>
                                              </div>
                                              <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink className="h-3 w-3" />
                                                <span>Visit Website</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                    </motion.a>
                                  ))}
                                </div>
                              </div>

                              {/* State Government Schemes */}
                              <div className="mt-6">
                                <h5 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-indigo-600" />
                                  State Government Schemes
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    {
                                      title: "Karnataka - Krishi Bhagya Scheme",
                                      description: "Water conservation and irrigation support for farmers",
                                      subsidy: "Up to ₹1 Lakh",
                                      link: "https://raitamitra.karnataka.gov.in/",
                                      state: "Karnataka"
                                    },
                                    {
                                      title: "Maharashtra - Jalyukt Shivar Abhiyan",
                                      description: "Water conservation and watershed development program",
                                      subsidy: "Varies by project",
                                      link: "https://www.maharashtra.gov.in/",
                                      state: "Maharashtra"
                                    },
                                    {
                                      title: "Punjab - Kisan Vikas Yojana",
                                      description: "Financial assistance for modern farming equipment and technology",
                                      subsidy: "Up to 50% subsidy",
                                      link: "https://punjab.gov.in/",
                                      state: "Punjab"
                                    },
                                    {
                                      title: "Tamil Nadu - Chief Minister's Dry Land Development Scheme",
                                      description: "Support for dryland farming and water management",
                                      subsidy: "Up to ₹50,000",
                                      link: "https://www.tn.gov.in/",
                                      state: "Tamil Nadu"
                                    },
                                    {
                                      title: "Gujarat - Krishi Mahotsav",
                                      description: "Agricultural development and farmer support program",
                                      subsidy: "Multiple benefits",
                                      link: "https://www.gujaratindia.com/",
                                      state: "Gujarat"
                                    },
                                    {
                                      title: "Rajasthan - Mukhyamantri Krishi Saathi Yojana",
                                      description: "Financial assistance for agricultural equipment and inputs",
                                      subsidy: "Up to 50% subsidy",
                                      link: "https://rajasthan.gov.in/",
                                      state: "Rajasthan"
                                    },
                                    {
                                      title: "Andhra Pradesh - Rythu Bharosa",
                                      description: "Direct financial assistance to farmers",
                                      subsidy: "₹13,500/year",
                                      link: "https://www.ap.gov.in/",
                                      state: "Andhra Pradesh"
                                    },
                                    {
                                      title: "Telangana - Rythu Bandhu",
                                      description: "Investment support scheme for farmers",
                                      subsidy: "₹10,000/acre/year",
                                      link: "https://www.telangana.gov.in/",
                                      state: "Telangana"
                                    },
                                    {
                                      title: "Kerala - Karshaka Keralam",
                                      description: "Comprehensive agricultural development program",
                                      subsidy: "Multiple schemes",
                                      link: "https://www.kerala.gov.in/",
                                      state: "Kerala"
                                    },
                                    {
                                      title: "West Bengal - Krishak Bandhu",
                                      description: "Financial assistance and insurance for farmers",
                                      subsidy: "₹5,000/acre + insurance",
                                      link: "https://www.wb.gov.in/",
                                      state: "West Bengal"
                                    }
                                  ].map((scheme, idx) => (
                                    <motion.a
                                      key={idx}
                                      href={scheme.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      whileHover={{ scale: 1.02, y: -2 }}
                                      className="block"
                                    >
                                      <Card className="p-4 bg-white/90 backdrop-blur-md rounded-xl border-2 border-indigo-200/50 shadow-md hover:shadow-lg transition-all hover:border-indigo-300/70 cursor-pointer group">
                                        <div className="flex items-start gap-3">
                                          <div className="bg-indigo-100 p-2.5 rounded-xl shadow-sm border border-indigo-200/50 group-hover:bg-indigo-200 transition-colors">
                                            <MapPin className="h-4.5 w-4.5 text-indigo-700" />
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1.5">
                                              <h5 className="font-bold text-foreground text-sm">{scheme.title}</h5>
                                              <Badge className="bg-blue-100 text-blue-700 text-xs font-bold border border-blue-300/50">
                                                {scheme.state}
                                              </Badge>
                                            </div>
                                            <p className="text-xs text-foreground/75 font-medium leading-relaxed mb-2">{scheme.description}</p>
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-md">
                                                <DollarSign className="h-3 w-3" />
                                                <span>{scheme.subsidy}</span>
                                              </div>
                                              <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink className="h-3 w-3" />
                                                <span>Visit Website</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                    </motion.a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Accessories Tab - Enhanced */}
                      <TabsContent value="accessories" className="space-y-6 relative">
                        {/* Hero Section */}
                        <motion.div
                          className="relative rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="relative h-40 overflow-hidden rounded-2xl shadow-2xl">
                            <img 
                              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=300&fit=crop&q=80"
                              alt="Equipment"
                              className="w-full h-full object-cover opacity-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/35"></div>
                            <div className="relative z-10 p-6 text-white">
                              <motion.div
                                className="flex items-center gap-3 mb-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
                                  <Wrench className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-xl tracking-tight">Essential Farming Accessories & Equipment</h3>
                              </motion.div>
                              <p className="text-white/95 drop-shadow-lg text-sm font-semibold max-w-2xl">
                                Equip yourself with the right tools for successful farming
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Equipment Categories */}
                        <div className="space-y-5">
                          {getAccessories().map((category, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.15 }}
                              className="relative"
                            >
                              <Card className="border-2 border-purple-200/60 bg-gradient-to-br from-purple-50/95 to-pink-50/95 p-6.5 relative overflow-hidden shadow-lg hover:shadow-2xl transition-all group backdrop-blur-sm">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-44 h-44 bg-purple-100/20 rounded-bl-full -mr-22 -mt-22 blur-xl"></div>
                                <div className="absolute bottom-0 left-0 w-36 h-36 bg-pink-100/15 rounded-tr-full -ml-18 -mb-18 blur-xl"></div>
                                
                                <div className="relative z-10">
                                  <div className="flex items-center gap-3.5 mb-5">
                                    <motion.div
                                      className="bg-purple-100 p-3.5 rounded-xl shadow-md border border-purple-200/50"
                                      animate={{ rotate: [0, 10, -10, 0] }}
                                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                                    >
                                      <Wrench className="h-6.5 w-6.5 text-purple-700" />
                                    </motion.div>
                                    <h4 className="text-xl font-extrabold text-foreground tracking-tight">{category.category}</h4>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                    {category.items.map((item, itemIndex) => (
                                      <motion.div
                                        key={itemIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.15 + itemIndex * 0.05 }}
                                        className="flex items-center gap-3.5 p-3.5 bg-white/90 backdrop-blur-md rounded-lg border-2 border-purple-200/50 hover:border-purple-300/70 hover:shadow-lg transition-all group/item"
                                      >
                                        <motion.div
                                          animate={{ scale: [1, 1.2, 1] }}
                                          transition={{ duration: 2, repeat: Infinity, delay: itemIndex * 0.3 }}
                                        >
                                          <CheckCircle2 className="h-5 w-5 text-purple-700 flex-shrink-0" />
                                        </motion.div>
                                        <span className="text-sm font-semibold text-foreground group-hover/item:text-purple-800 transition-colors">{item}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>

                        {/* Equipment Buying Tips */}
                        <div className="bg-gradient-to-br from-slate-50/90 to-gray-50/90 rounded-2xl p-7 border-2 border-slate-200/60 relative overflow-hidden backdrop-blur-sm shadow-lg">
                          <div className="absolute top-0 right-0 w-44 h-44 bg-slate-200/15 rounded-bl-full -mr-22 -mt-22 blur-xl"></div>
                          <div className="relative z-10">
                            <h4 className="text-xl font-extrabold text-foreground mb-5 flex items-center gap-3">
                              <div className="p-2 bg-slate-100 rounded-xl shadow-md border border-slate-300/50">
                                <ShoppingCart className="h-5 w-5 text-slate-700" />
                              </div>
                              Smart Buying Tips
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                { icon: Target, text: "Buy quality over quantity", color: "blue", bg: "bg-blue-100", iconColor: "text-blue-700", border: "border-blue-300/50" },
                                { icon: Shield, text: "Check warranties and guarantees", color: "green", bg: "bg-green-100", iconColor: "text-green-700", border: "border-green-300/50" },
                                { icon: DollarSign, text: "Compare prices from multiple vendors", color: "orange", bg: "bg-orange-100", iconColor: "text-orange-700", border: "border-orange-300/50" },
                              ].map((tip, idx) => {
                                const Icon = tip.icon;
                                return (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    className={`flex items-center gap-3.5 p-4.5 bg-white/90 backdrop-blur-md rounded-xl border-2 ${tip.border} shadow-md hover:shadow-lg transition-all`}
                                  >
                                    <div className={`${tip.bg} p-2.5 rounded-xl shadow-sm border border-white/50`}>
                                      <Icon className={`h-5.5 w-5.5 ${tip.iconColor}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">{tip.text}</span>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      </Tabs>
                    </div>
                  </Card>

                    <motion.div
                      className="flex justify-end gap-4 mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          onClick={() => navigate("/farm-academy")}
                        >
                          Back to Academy
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={handleNext}
                        >
                          Start Analysis
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
              )}

              {/* Farming Type Details Dialog */}
              <Dialog open={selectedFarmingType !== null} onOpenChange={(open) => !open && setSelectedFarmingType(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  {selectedFarmingType && (() => {
                    const details = getFarmingTypeDetails(selectedFarmingType);
                    if (!details) return null;
                    
                    return (
                      <>
                        <DialogHeader>
                          <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-extrabold text-foreground flex items-center gap-3">
                              {details.title}
                            </DialogTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedFarmingType(null)}
                              className="rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <DialogDescription className="text-base text-foreground/80 mt-2">
                            {details.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-6">
                          {/* Key Features */}
                          <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/90 rounded-xl p-5 border-2 border-blue-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-blue-600" />
                              Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.keyFeatures.map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 rounded-xl p-5 border-2 border-green-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Award className="h-5 w-5 text-green-600" />
                              Benefits
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.benefits.map((benefit, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Challenges */}
                          <div className="bg-gradient-to-br from-orange-50/90 to-amber-50/90 rounded-xl p-5 border-2 border-orange-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-orange-600" />
                              Challenges to Consider
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.challenges.map((challenge, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{challenge}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Best For */}
                          <div className="bg-gradient-to-br from-purple-50/90 to-pink-50/90 rounded-xl p-5 border-2 border-purple-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Target className="h-5 w-5 text-purple-600" />
                              Best For
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.bestFor.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Article Reference */}
                          <div className="bg-gradient-to-br from-slate-50/90 to-gray-50/90 rounded-xl p-5 border-2 border-slate-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-slate-600" />
                              Learn More
                            </h3>
                            <motion.a
                              href={details.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-4 bg-white/80 rounded-lg border-2 border-slate-200/50 hover:border-slate-300/70 transition-all group"
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                                <ExternalLink className="h-5 w-5 text-slate-700" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground group-hover:text-slate-700 transition-colors">
                                  {details.articleTitle}
                                </p>
                                <p className="text-xs text-foreground/60 mt-1">Click to read the full article</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </DialogContent>
              </Dialog>

              {/* Step Details Dialog */}
              <Dialog open={selectedStep !== null} onOpenChange={(open) => !open && setSelectedStep(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  {selectedStep && (() => {
                    const details = getStepDetails(selectedStep);
                    if (!details) return null;
                    
                    return (
                      <>
                        <DialogHeader>
                          <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-extrabold text-foreground flex items-center gap-3">
                              {details.title}
                            </DialogTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedStep(null)}
                              className="rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <DialogDescription className="text-base text-foreground/80 mt-2">
                            {details.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-6">
                          {/* Key Points */}
                          <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/90 rounded-xl p-5 border-2 border-blue-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-600" />
                              Key Points
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.keyPoints.map((point, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{point}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Methods */}
                          <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 rounded-xl p-5 border-2 border-green-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-green-600" />
                              Methods & Approaches
                            </h3>
                            <div className="space-y-3">
                              {details.methods.map((method, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <Sparkles className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{method}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Tips */}
                          <div className="bg-gradient-to-br from-yellow-50/90 to-amber-50/90 rounded-xl p-5 border-2 border-yellow-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Award className="h-5 w-5 text-yellow-600" />
                              Pro Tips
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.tips.map((tip, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{tip}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Tools */}
                          <div className="bg-gradient-to-br from-purple-50/90 to-pink-50/90 rounded-xl p-5 border-2 border-purple-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Wrench className="h-5 w-5 text-purple-600" />
                              Essential Tools & Equipment
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.tools.map((tool, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <Package className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{tool}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Article Reference */}
                          <div className="bg-gradient-to-br from-slate-50/90 to-gray-50/90 rounded-xl p-5 border-2 border-slate-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-slate-600" />
                              Learn More
                            </h3>
                            <motion.a
                              href={details.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-4 bg-white/80 rounded-lg border-2 border-slate-200/50 hover:border-slate-300/70 transition-all group"
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                                <ExternalLink className="h-5 w-5 text-slate-700" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground group-hover:text-slate-700 transition-colors">
                                  {details.articleTitle}
                                </p>
                                <p className="text-xs text-foreground/60 mt-1">Click to read the full article</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </DialogContent>
              </Dialog>

              {/* Principle Details Dialog */}
              <Dialog open={selectedPrinciple !== null} onOpenChange={(open) => !open && setSelectedPrinciple(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  {selectedPrinciple && (() => {
                    const details = getPrincipleDetails(selectedPrinciple);
                    if (!details) return null;
                    
                    return (
                      <>
                        <DialogHeader>
                          <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-extrabold text-foreground flex items-center gap-3">
                              {details.title}
                            </DialogTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedPrinciple(null)}
                              className="rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <DialogDescription className="text-base text-foreground/80 mt-2">
                            {details.description}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 mt-6">
                          {/* Key Benefits */}
                          <div className="bg-gradient-to-br from-green-50/90 to-emerald-50/90 rounded-xl p-5 border-2 border-green-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Award className="h-5 w-5 text-green-600" />
                              Key Benefits
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.keyBenefits.map((benefit, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Methods */}
                          <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/90 rounded-xl p-5 border-2 border-blue-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-blue-600" />
                              Methods & Approaches
                            </h3>
                            <div className="space-y-3">
                              {details.methods.map((method, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{method}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Best Practices */}
                          <div className="bg-gradient-to-br from-yellow-50/90 to-amber-50/90 rounded-xl p-5 border-2 border-yellow-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <Target className="h-5 w-5 text-yellow-600" />
                              Best Practices
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.bestPractices.map((practice, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{practice}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Common Mistakes */}
                          <div className="bg-gradient-to-br from-orange-50/90 to-red-50/90 rounded-xl p-5 border-2 border-orange-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-orange-600" />
                              Common Mistakes to Avoid
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {details.commonMistakes.map((mistake, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-2 p-3 bg-white/80 rounded-lg"
                                >
                                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80 font-medium">{mistake}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Article Reference */}
                          <div className="bg-gradient-to-br from-slate-50/90 to-gray-50/90 rounded-xl p-5 border-2 border-slate-200/60">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-slate-600" />
                              Learn More
                            </h3>
                            <motion.a
                              href={details.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-4 bg-white/80 rounded-lg border-2 border-slate-200/50 hover:border-slate-300/70 transition-all group"
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                                <ExternalLink className="h-5 w-5 text-slate-700" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-foreground group-hover:text-slate-700 transition-colors">
                                  {details.articleTitle}
                                </p>
                                <p className="text-xs text-foreground/60 mt-1">Click to read the full article</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </DialogContent>
              </Dialog>

              {/* Step 1: Region */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative"
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-[0.10] pointer-events-none rounded-lg overflow-hidden">
                    <img 
                      src={backgroundImages.region}
                      alt="Regional farming"
                      className="w-full h-full object-cover brightness-105"
                    />
                  </div>
                  
                  <Card className="border-orange-200 bg-white/95 backdrop-blur-sm p-6 shadow-xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100/20 rounded-bl-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100/20 rounded-tr-full -ml-16 -mb-16"></div>
                    
                    <div className="relative z-10">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <MapPin className="h-6 w-6 text-orange-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-foreground">Select Your Region</h2>
                      </div>
                      <p className="text-muted-foreground">Help us provide location-specific farming recommendations</p>
                    </motion.div>
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Input
                          id="district"
                          placeholder="Enter your district"
                          value={formData.district}
                          onChange={(e) => handleInputChange("district", e.target.value)}
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="region">Village/Region (Optional)</Label>
                        <Input
                          id="region"
                          placeholder="Enter your village or region"
                          value={formData.region}
                          onChange={(e) => handleInputChange("region", e.target.value)}
                        />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="mt-6 flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" onClick={handlePrevious}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: formData.state ? 1.05 : 1, boxShadow: formData.state ? "0 10px 25px rgba(249, 115, 22, 0.3)" : "none" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={handleNext}
                          disabled={!formData.state}
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </motion.div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Budget & Scale */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative"
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-lg overflow-hidden">
                    <img 
                      src={backgroundImages.budget}
                      alt="Budget planning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <Card className="border-orange-200 bg-white/95 backdrop-blur-sm p-6 shadow-xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-36 h-36 bg-green-100/20 rounded-br-full -ml-18 -mt-18"></div>
                    <div className="absolute bottom-0 right-0 w-28 h-28 bg-amber-100/20 rounded-tl-full -mr-14 -mb-14"></div>
                    
                    <div className="relative z-10">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Wallet className="h-6 w-6 text-orange-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-foreground">Budget & Farming Scale</h2>
                      </div>
                      <p className="text-muted-foreground">Tell us about your investment capacity and experience</p>
                    </motion.div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Level</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                        <SelectTrigger id="experience">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size (in acres)</Label>
                      <Input
                        id="farmSize"
                        type="number"
                        placeholder="Enter farm size"
                        value={formData.farmSize}
                        onChange={(e) => handleInputChange("farmSize", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Interested Crops (Select multiple)</Label>
                      <motion.div
                        className="grid grid-cols-2 gap-2 md:grid-cols-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {crops.map((crop, idx) => (
                          <motion.div
                            key={crop}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition ${
                              formData.cropsInterested.includes(crop)
                                ? "border-orange-500 bg-orange-50 shadow-md"
                                : "border-border bg-white hover:border-orange-200"
                            }`}
                            onClick={() => handleCropToggle(crop)}
                            animate={{
                              scale: formData.cropsInterested.includes(crop) ? [1, 1.05, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              animate={{
                                scale: formData.cropsInterested.includes(crop) ? [0, 1.2, 1] : 1,
                                rotate: formData.cropsInterested.includes(crop) ? [0, 360] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <CheckCircle2
                                className={`h-4 w-4 ${
                                  formData.cropsInterested.includes(crop) ? "text-orange-600" : "text-muted-foreground"
                                }`}
                              />
                            </motion.div>
                            <span className="text-sm">{crop}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={handleNext}
                      disabled={!formData.budget || !formData.experience}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Soil Type */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative"
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-lg overflow-hidden">
                    <img 
                      src={backgroundImages.soil}
                      alt="Soil types"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <Card className="border-orange-200 bg-white/95 backdrop-blur-sm p-6 shadow-xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-green-100/20 rounded-bl-full -mr-22 -mt-22"></div>
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-100/20 rounded-tr-full -ml-18 -mb-18"></div>
                    
                    <div className="relative z-10">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <Leaf className="h-6 w-6 text-orange-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-foreground">Soil Type Selection</h2>
                      </div>
                      <p className="text-muted-foreground">Select the type of soil in your farming area</p>
                    </motion.div>
                    <motion.div
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {soilTypes.map((soil, idx) => (
                        <motion.div
                          key={soil}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition relative overflow-hidden ${
                            formData.soilType === soil
                              ? "border-orange-500 bg-orange-50/90 shadow-lg backdrop-blur-sm"
                              : "border-border bg-white/90 backdrop-blur-sm hover:border-orange-200"
                          }`}
                          onClick={() => handleInputChange("soilType", soil)}
                          animate={{
                            boxShadow: formData.soilType === soil
                              ? "0 10px 25px rgba(249, 115, 22, 0.2)"
                              : "0 1px 3px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          {/* Subtle background pattern for selected soil */}
                          {formData.soilType === soil && (
                            <div className="absolute inset-0 opacity-5">
                              <div className="w-full h-full bg-gradient-to-r from-orange-200 to-amber-200"></div>
                            </div>
                          )}
                          
                          <motion.div
                            className={`flex h-10 w-10 items-center justify-center rounded-full relative z-10 ${
                              formData.soilType === soil ? "bg-orange-500" : "bg-muted"
                            }`}
                            animate={{
                              scale: formData.soilType === soil ? [1, 1.1, 1] : 1,
                              rotate: formData.soilType === soil ? [0, 5, -5, 0] : 0,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <Leaf className={`h-5 w-5 ${formData.soilType === soil ? "text-white" : "text-muted-foreground"}`} />
                          </motion.div>
                          <div className="flex-1 relative z-10">
                            <p className="font-semibold text-foreground">{soil}</p>
                            <p className="text-xs text-muted-foreground">
                              {soil === "Alluvial Soil" && "Best for rice, wheat, sugarcane"}
                              {soil === "Black Soil (Regur)" && "Ideal for cotton, oilseeds"}
                              {soil === "Red Soil" && "Suitable for millets, pulses"}
                              {soil === "Laterite Soil" && "Good for tea, coffee, cashew"}
                              {soil === "Mountain Soil" && "Perfect for fruits, vegetables"}
                              {soil === "Desert Soil" && "Requires irrigation, suitable for dates"}
                              {soil === "Saline & Alkaline Soil" && "Needs reclamation before farming"}
                              {soil === "Peaty & Marshy Soil" && "Rich in organic matter"}
                            </p>
                          </div>
                          <AnimatePresence>
                            {formData.soilType === soil && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                className="relative z-10"
                              >
                                <CheckCircle2 className="h-5 w-5 text-orange-600" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </motion.div>
                  <div className="mt-6 flex justify-between">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" onClick={handlePrevious}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: formData.soilType ? 1.05 : 1, boxShadow: formData.soilType ? "0 10px 25px rgba(249, 115, 22, 0.3)" : "none" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={handleNext}
                        disabled={!formData.soilType}
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Soil Analysis */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative"
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-lg overflow-hidden">
                    <img 
                      src={backgroundImages.analysis}
                      alt="Soil analysis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <Card className="border-orange-200 bg-white/95 backdrop-blur-sm p-6 shadow-xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100/20 rounded-br-full -ml-20 -mt-20"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100/20 rounded-tl-full -mr-16 -mb-16"></div>
                    
                    <div className="relative z-10">
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                          <FlaskConical className="h-6 w-6 text-orange-600" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-foreground">Soil Image Analysis</h2>
                      </div>
                      <p className="text-muted-foreground">Upload or capture soil/leaf images for AI-powered analysis</p>
                    </motion.div>
                  <div className="space-y-6">
                    <Tabs defaultValue="upload" className="space-y-4">
                      <TabsList className="bg-muted/50 backdrop-blur-sm">
                        <TabsTrigger value="upload">Upload Photo</TabsTrigger>
                        <TabsTrigger value="camera">Use Camera</TabsTrigger>
                      </TabsList>

                      <TabsContent value="upload" className="space-y-4">
                        <motion.div
                          className="cursor-pointer rounded-lg border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50/80 to-amber-50/60 p-8 text-center transition relative overflow-hidden backdrop-blur-sm"
                          onClick={() => fileInputRef.current?.click()}
                          whileHover={{ scale: 1.02, borderColor: "rgb(249, 115, 22)" }}
                          whileTap={{ scale: 0.98 }}
                          animate={{
                            borderColor: ["rgb(253, 186, 116)", "rgb(249, 115, 22)", "rgb(253, 186, 116)"],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {/* Subtle background pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200"></div>
                          </div>
                          
                          <div className="relative z-10">
                            <motion.div
                              animate={{ y: [0, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Upload className="mx-auto h-12 w-12 text-orange-600" />
                            </motion.div>
                            <p className="mt-4 font-semibold text-foreground">Click to upload soil images</p>
                            <p className="text-sm text-muted-foreground">Supports JPG, PNG up to 10MB each</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="camera" className="space-y-4">
                        {!isCameraActive ? (
                          <motion.div 
                            className="rounded-lg border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50/80 to-amber-50/60 p-8 text-center relative overflow-hidden backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Background decoration */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="w-full h-full bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200"></div>
                            </div>
                            <div className="relative z-10">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Camera className="mx-auto h-12 w-12 text-orange-600" />
                            </motion.div>
                            <p className="mt-4 font-semibold text-foreground">Capture soil sample</p>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={startCamera}>
                                <Camera className="mr-2 h-4 w-4" />
                                Open Camera
                              </Button>
                            </motion.div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="space-y-4">
                            <div className="relative overflow-hidden rounded-lg border border-orange-200 bg-black">
                              <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="h-full w-full"
                                style={{ maxHeight: "400px" }}
                              />
                              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
                                <Button
                                  onClick={capturePhoto}
                                  size="lg"
                                  className="rounded-full bg-orange-500 hover:bg-orange-600"
                                >
                                  <Camera className="mr-2 h-5 w-5" />
                                  Capture
                                </Button>
                                <Button onClick={stopCamera} size="lg" variant="outline" className="rounded-full bg-white/90">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        <canvas ref={canvasRef} className="hidden" />
                      </TabsContent>
                    </Tabs>

                    {/* Selected Images */}
                    <AnimatePresence>
                      {selectedImages.length > 0 && (
                        <motion.div
                          className="space-y-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.h3
                            className="font-semibold text-foreground flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            </motion.div>
                            Uploaded Images ({selectedImages.length})
                          </motion.h3>
                          <motion.div
                            className="grid grid-cols-2 gap-4 md:grid-cols-3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {selectedImages.map((img, index) => (
                              <motion.div
                                key={index}
                                variants={itemVariants}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="group relative aspect-square overflow-hidden rounded-lg border-2 border-orange-200 shadow-md hover:shadow-xl transition-shadow"
                              >
                                <img src={img} alt={`Soil sample ${index + 1}`} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <motion.button
                                  onClick={() => removeImage(index)}
                                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg"
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileHover={{ opacity: 1, scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  animate={{ opacity: [0, 1] }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <span className="text-sm font-bold">×</span>
                                </motion.button>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" onClick={handlePrevious}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: selectedImages.length > 0 ? 1.05 : 1, boxShadow: selectedImages.length > 0 ? "0 10px 25px rgba(249, 115, 22, 0.3)" : "none" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={handleAnalyze}
                        disabled={selectedImages.length === 0}
                      >
                        <FlaskConical className="mr-2 h-4 w-4" />
                        Analyze Image
                      </Button>
                    </motion.div>
                  </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 5: Analysis & Guidance */}
              {currentStep === 5 && showAnalysis && (
                <motion.div
                  key="step-5"
                  className="space-y-6 relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-lg overflow-hidden">
                    <img 
                      src={backgroundImages.analysis}
                      alt="Analysis results"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/95 to-white/95 backdrop-blur-sm p-6 shadow-2xl relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-100/20 rounded-bl-full -mr-26 -mt-26"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-100/20 rounded-tr-full -ml-20 -mb-20"></div>
                      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-100/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      
                      <div className="relative z-10">
                      <motion.div
                        className="mb-6 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.div
                          className="rounded-full bg-emerald-100 p-3 shadow-lg"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <TrendingUp className="h-6 w-6 text-emerald-600" />
                        </motion.div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">Personalized Analysis & Guidance</h2>
                          <p className="text-muted-foreground">Based on your inputs, here's your customized farming plan</p>
                        </div>
                      </motion.div>

                    {/* Summary */}
                    <div className="mb-6 rounded-lg border border-emerald-200 bg-white/90 backdrop-blur-sm p-4 relative overflow-hidden shadow-md">
                      {/* Background pattern */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/20 rounded-bl-full"></div>
                      <div className="relative z-10">
                      <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Award className="h-5 w-5 text-emerald-600" />
                        </motion.div>
                        Your Farming Profile
                      </h3>
                      <div className="grid gap-2 text-sm md:grid-cols-2">
                        <div>
                          <span className="text-muted-foreground">Region: </span>
                          <span className="font-semibold text-foreground">{formData.state}, {formData.district}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget: </span>
                          <span className="font-semibold text-foreground">
                            {budgetRanges.find((r) => r.value === formData.budget)?.label || formData.budget}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Soil Type: </span>
                          <span className="font-semibold text-foreground">{formData.soilType}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Experience: </span>
                          <span className="font-semibold text-foreground">{formData.experience}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Farm Size: </span>
                          <span className="font-semibold text-foreground">{formData.farmSize || "Not specified"} acres</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Interested Crops: </span>
                          <span className="font-semibold text-foreground">{formData.cropsInterested.join(", ") || "Not specified"}</span>
                        </div>
                      </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h3
                        className="font-semibold text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Personalized Recommendations
                      </motion.h3>
                      {getRecommendations().map((rec, index) => {
                        const RecIcon = rec.icon;
                        return (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <Card className="border-emerald-200 bg-white/95 backdrop-blur-sm p-4 cursor-pointer relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                              {/* Decorative corner */}
                              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100/20 rounded-bl-full"></div>
                              <div className="relative z-10">
                              <div className="flex items-start gap-3">
                                <motion.div
                                  className="rounded-full bg-emerald-100 p-2 shadow-sm"
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                >
                                  <RecIcon className="h-5 w-5 text-emerald-600" />
                                </motion.div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground">{rec.title}</h4>
                                  <p className="mt-1 text-sm text-foreground/80">{rec.description}</p>
                                </div>
                              </div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Soil Analysis Results */}
                    {selectedImages.length > 0 && soilAnalysisResults && (
                      <motion.div 
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          >
                            <FlaskConical className="h-5 w-5 text-blue-600" />
                          </motion.div>
                          {imageType === "leaf" ? "AI-Powered Leaf Analysis Results" : "AI-Powered Soil Analysis Results"}
                        </h3>

                        {/* Overall Health Score */}
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50/90 to-cyan-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-bl-full"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-bold text-foreground text-lg">{imageType === "leaf" ? "Leaf Health Score" : "Soil Health Score"}</h4>
                                <p className="text-sm text-muted-foreground">Analysis Date: {soilAnalysisResults.analysisDate}</p>
                              </div>
                              <div className="text-center">
                                <div className={`text-4xl font-extrabold ${
                                  soilAnalysisResults.healthScore >= 80 ? "text-green-600" :
                                  soilAnalysisResults.healthScore >= 70 ? "text-yellow-600" : "text-orange-600"
                                }`}>
                                  {soilAnalysisResults.healthScore}%
                                </div>
                                <Badge className={`mt-2 ${
                                  soilAnalysisResults.healthScore >= 80 ? "bg-green-100 text-green-700 border-green-300" :
                                  soilAnalysisResults.healthScore >= 70 ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-orange-100 text-orange-700 border-orange-300"
                                }`}>
                                  {soilAnalysisResults.overallStatus}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-4">
                              {imageType === "leaf" ? (
                                <div className="space-y-2">
                                  <p className="text-sm font-semibold text-foreground">Health Status: <span className="text-blue-600">{soilAnalysisResults.healthStatus}</span></p>
                                  <p className="text-sm font-semibold text-foreground">Leaf Age: <span className="text-blue-600">{soilAnalysisResults.leafAge}</span> | Leaf Size: <span className="text-blue-600">{soilAnalysisResults.leafSize}</span></p>
                                  {soilAnalysisResults.colorAnalysis && (
                                    <p className="text-sm font-semibold text-foreground">Dominant Color: <span className="text-blue-600">{soilAnalysisResults.colorAnalysis.dominantColor}</span> | Green Intensity: <span className="text-blue-600">{soilAnalysisResults.colorAnalysis.greenIntensity}%</span></p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm font-semibold text-foreground mb-2">Soil Texture: <span className="text-blue-600">{soilAnalysisResults.soilTexture}</span></p>
                              )}
                            </div>
                          </div>
                        </Card>

                        {/* Nutrients - Conditional based on image type */}
                        {imageType === "leaf" ? (
                          <Card className="border-green-200 bg-gradient-to-br from-green-50/90 to-emerald-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/20 rounded-bl-full"></div>
                            <div className="relative z-10">
                              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-green-600" />
                                Leaf Nutrient Analysis
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Nitrogen */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Nitrogen (N)</span>
                                    <Badge className={`${
                                      soilAnalysisResults.nutrients.nitrogen.status === "Adequate" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {soilAnalysisResults.nutrients.nitrogen.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.nutrients.nitrogen.value} {soilAnalysisResults.nutrients.nitrogen.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.nutrients.nitrogen.ideal}</p>
                                </div>

                                {/* Phosphorus */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Phosphorus (P)</span>
                                    <Badge className={`${
                                      soilAnalysisResults.nutrients.phosphorus.status === "Adequate" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {soilAnalysisResults.nutrients.phosphorus.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.nutrients.phosphorus.value} {soilAnalysisResults.nutrients.phosphorus.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.nutrients.phosphorus.ideal}</p>
                                </div>

                                {/* Potassium */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Potassium (K)</span>
                                    <Badge className={`${
                                      soilAnalysisResults.nutrients.potassium.status === "Adequate" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {soilAnalysisResults.nutrients.potassium.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.nutrients.potassium.value} {soilAnalysisResults.nutrients.potassium.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.nutrients.potassium.ideal}</p>
                                </div>

                                {/* Chlorophyll */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Chlorophyll</span>
                                    <Badge className={`${
                                      soilAnalysisResults.nutrients.chlorophyll.status === "Optimal" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                      {soilAnalysisResults.nutrients.chlorophyll.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.nutrients.chlorophyll.value} {soilAnalysisResults.nutrients.chlorophyll.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.nutrients.chlorophyll.ideal}</p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ) : (
                          <Card className="border-green-200 bg-gradient-to-br from-green-50/90 to-emerald-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/20 rounded-bl-full"></div>
                            <div className="relative z-10">
                              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-green-600" />
                                Macro Nutrients (NPK)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Nitrogen */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Nitrogen (N)</span>
                                    <Badge className={`${
                                      soilAnalysisResults.nitrogen.status === "Optimal" ? "bg-green-100 text-green-700" :
                                      soilAnalysisResults.nitrogen.status === "Good" ? "bg-blue-100 text-blue-700" :
                                      soilAnalysisResults.nitrogen.status === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {soilAnalysisResults.nitrogen.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.nitrogen.value} {soilAnalysisResults.nitrogen.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.nitrogen.ideal}</p>
                                </div>

                                {/* Phosphorus */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Phosphorus (P)</span>
                                    <Badge className={`${
                                      soilAnalysisResults.phosphorus.status === "Optimal" ? "bg-green-100 text-green-700" :
                                      soilAnalysisResults.phosphorus.status === "Good" ? "bg-blue-100 text-blue-700" :
                                      soilAnalysisResults.phosphorus.status === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {soilAnalysisResults.phosphorus.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.phosphorus.value} {soilAnalysisResults.phosphorus.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.phosphorus.ideal}</p>
                                </div>

                                {/* Potassium */}
                                <div className="bg-white/80 rounded-lg p-4 border-2 border-green-200/50">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-foreground">Potassium (K)</span>
                                    <Badge className={`${
                                      soilAnalysisResults.potassium.status === "Optimal" ? "bg-green-100 text-green-700" :
                                      soilAnalysisResults.potassium.status === "Good" ? "bg-blue-100 text-blue-700" :
                                      soilAnalysisResults.potassium.status === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {soilAnalysisResults.potassium.status}
                                    </Badge>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600 mb-1">
                                    {soilAnalysisResults.potassium.value} {soilAnalysisResults.potassium.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.potassium.ideal}</p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}

                        {/* Soil Properties - Only for soil analysis */}
                        {imageType === "soil" && (
                          <Card className="border-purple-200 bg-gradient-to-br from-purple-50/90 to-pink-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/20 rounded-bl-full"></div>
                          <div className="relative z-10">
                            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                              <Activity className="h-5 w-5 text-purple-600" />
                              Soil Properties
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* pH Level */}
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-purple-200/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-foreground">pH Level</span>
                                  <Badge className={`${
                                    soilAnalysisResults.pH.status === "Optimal" ? "bg-green-100 text-green-700" :
                                    soilAnalysisResults.pH.status.includes("Acidic") || soilAnalysisResults.pH.status.includes("Alkaline") ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"
                                  }`}>
                                    {soilAnalysisResults.pH.status}
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                  {soilAnalysisResults.pH.value}
                                </div>
                                <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.pH.ideal}</p>
                              </div>

                              {/* Water Absorption */}
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-purple-200/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-foreground">Water Absorption</span>
                                  <Badge className={`${
                                    soilAnalysisResults.waterAbsorption.status === "Excellent" ? "bg-green-100 text-green-700" :
                                    soilAnalysisResults.waterAbsorption.status === "Good" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                                  }`}>
                                    {soilAnalysisResults.waterAbsorption.status}
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                  {soilAnalysisResults.waterAbsorption.value} {soilAnalysisResults.waterAbsorption.unit}
                                </div>
                                <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.waterAbsorption.ideal}</p>
                              </div>

                              {/* Organic Matter */}
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-purple-200/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-foreground">Organic Matter</span>
                                  <Badge className={`${
                                    soilAnalysisResults.organicMatter.status === "Good" ? "bg-green-100 text-green-700" :
                                    soilAnalysisResults.organicMatter.status === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                  }`}>
                                    {soilAnalysisResults.organicMatter.status}
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                  {soilAnalysisResults.organicMatter.value} {soilAnalysisResults.organicMatter.unit}
                                </div>
                                <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.organicMatter.ideal}</p>
                              </div>

                              {/* Bulk Density */}
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-purple-200/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-foreground">Bulk Density</span>
                                  <Badge className={`${
                                    soilAnalysisResults.bulkDensity.status === "Good" ? "bg-green-100 text-green-700" :
                                    soilAnalysisResults.bulkDensity.status === "Moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                  }`}>
                                    {soilAnalysisResults.bulkDensity.status}
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                  {soilAnalysisResults.bulkDensity.value} {soilAnalysisResults.bulkDensity.unit}
                                </div>
                                <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.bulkDensity.ideal}</p>
                              </div>

                              {/* Cation Exchange Capacity */}
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-purple-200/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-foreground">CEC</span>
                                  <Badge className={`${
                                    soilAnalysisResults.cationExchange.status === "Excellent" || soilAnalysisResults.cationExchange.status === "Optimal" ? "bg-green-100 text-green-700" :
                                    soilAnalysisResults.cationExchange.status === "Good" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                                  }`}>
                                    {soilAnalysisResults.cationExchange.status}
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                  {soilAnalysisResults.cationExchange.value} {soilAnalysisResults.cationExchange.unit}
                                </div>
                                <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.cationExchange.ideal}</p>
                              </div>

                              {/* Electrical Conductivity */}
                              <div className="bg-white/80 rounded-lg p-4 border-2 border-purple-200/50">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-semibold text-foreground">EC</span>
                                  <Badge className={`${
                                    soilAnalysisResults.electricalConductivity.status === "Normal" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                  }`}>
                                    {soilAnalysisResults.electricalConductivity.status}
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-purple-600 mb-1">
                                  {soilAnalysisResults.electricalConductivity.value} {soilAnalysisResults.electricalConductivity.unit}
                                </div>
                                <p className="text-xs text-muted-foreground">Ideal: {soilAnalysisResults.electricalConductivity.ideal}</p>
                              </div>
                            </div>
                          </div>
                        </Card>
                        )}

                        {/* Disease & Pest Analysis - Only for leaf analysis */}
                        {imageType === "leaf" && soilAnalysisResults.diseases && soilAnalysisResults.diseases.length > 0 && (
                          <Card className="border-red-200 bg-gradient-to-br from-red-50/90 to-orange-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/20 rounded-bl-full"></div>
                            <div className="relative z-10">
                              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                Disease & Pest Analysis
                              </h4>
                              <div className="space-y-4">
                                {/* Diseases */}
                                {soilAnalysisResults.diseases.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-foreground mb-3 text-sm">Detected Diseases</h5>
                                    <div className="space-y-2">
                                      {soilAnalysisResults.diseases.map((disease: any, idx: number) => (
                                        <div key={idx} className="bg-white/80 rounded-lg p-3 border-2 border-red-200/50">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-foreground text-sm">{disease.name}</span>
                                            <Badge className={`${
                                              disease.severity === "High" ? "bg-red-100 text-red-700" :
                                              disease.severity === "Moderate" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                              {disease.severity}
                                            </Badge>
                                          </div>
                                          <p className="text-xs text-muted-foreground mb-1">Confidence: {disease.confidence}</p>
                                          <p className="text-xs text-foreground font-medium">Treatment: {disease.treatment}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {/* Pests */}
                                {soilAnalysisResults.pests && soilAnalysisResults.pests.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold text-foreground mb-3 text-sm">Detected Pests</h5>
                                    <div className="space-y-2">
                                      {soilAnalysisResults.pests.map((pest: any, idx: number) => (
                                        <div key={idx} className="bg-white/80 rounded-lg p-3 border-2 border-orange-200/50">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-foreground text-sm">{pest.name}</span>
                                            <Badge className={`${
                                              pest.severity === "High" ? "bg-red-100 text-red-700" :
                                              pest.severity === "Moderate" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"
                                            }`}>
                                              {pest.severity}
                                            </Badge>
                                          </div>
                                          <p className="text-xs text-muted-foreground mb-1">Confidence: {pest.confidence}</p>
                                          <p className="text-xs text-foreground font-medium">Treatment: {pest.treatment}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        )}

                        {/* Micronutrients - Only for soil analysis */}
                        {imageType === "soil" && (
                          <Card className="border-amber-200 bg-gradient-to-br from-amber-50/90 to-yellow-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/20 rounded-bl-full"></div>
                          <div className="relative z-10">
                            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                              <Sparkles className="h-5 w-5 text-amber-600" />
                              Micronutrients
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {Object.entries(soilAnalysisResults.micronutrients).map(([key, nutrient]: [string, any]) => (
                                <div key={key} className="bg-white/80 rounded-lg p-3 border-2 border-amber-200/50">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-foreground text-sm capitalize">{key}</span>
                                    <Badge className="bg-green-100 text-green-700 text-xs">
                                      {nutrient.status}
                                    </Badge>
                                  </div>
                                  <div className="text-lg font-bold text-amber-600">
                                    {nutrient.value} {nutrient.unit}
                                  </div>
                                  <p className="text-xs text-muted-foreground">Ideal: {nutrient.ideal}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                        )}

                        {/* Detected Issues */}
                        {soilAnalysisResults.issues.length > 0 && (
                          <Card className="border-red-200 bg-gradient-to-br from-red-50/90 to-orange-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/20 rounded-bl-full"></div>
                            <div className="relative z-10">
                              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                Detected Issues
                              </h4>
                              <div className="space-y-2">
                                {soilAnalysisResults.issues.map((issue: string, idx: number) => (
                                  <div key={idx} className="flex items-start gap-2 p-3 bg-white/80 rounded-lg border-2 border-red-200/50">
                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-semibold text-foreground">{issue}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Card>
                        )}

                        {/* Recommendations */}
                        {soilAnalysisResults.recommendations.length > 0 && (
                          <Card className="border-blue-200 bg-gradient-to-br from-blue-50/90 to-cyan-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-bl-full"></div>
                            <div className="relative z-10">
                              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-blue-600" />
                                Recommendations
                              </h4>
                              <div className="space-y-2">
                                {soilAnalysisResults.recommendations.map((rec: string, idx: number) => (
                                  <div key={idx} className="flex items-start gap-2 p-3 bg-white/80 rounded-lg border-2 border-blue-200/50">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-medium text-foreground">{rec}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Card>
                        )}

                        {/* Uploaded Images */}
                        <Card className="border-slate-200 bg-gradient-to-br from-slate-50/90 to-gray-50/70 backdrop-blur-sm p-5 relative overflow-hidden shadow-lg">
                          <div className="relative z-10">
                            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                              <FileText className="h-5 w-5 text-slate-600" />
                              Analyzed Images
                            </h4>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                              {selectedImages.map((img, index) => (
                                <motion.div 
                                  key={index} 
                                  className="overflow-hidden rounded-lg border-2 border-slate-200 shadow-md hover:shadow-lg transition-shadow"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.7 + index * 0.1 }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <img src={img} alt={`Analysis ${index + 1}`} className="h-full w-full object-cover" />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )}

                    {/* Action Plan */}
                    <motion.div
                      className="mt-6 space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.h3
                        className="font-semibold text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Your Action Plan
                      </motion.h3>
                      <div className="space-y-3">
                        {[
                          { color: "orange", number: 1, title: "Immediate Actions (This Week)", items: ["Get soil tested at nearest agricultural lab", "Prepare land for cultivation", "Source quality seeds for selected crops", "Set up basic irrigation system"] },
                          { color: "blue", number: 2, title: "Short-term Goals (1-3 Months)", items: ["Start with small plot to gain experience", "Implement crop rotation plan", "Set up organic compost pit", "Connect with local agricultural extension office"] },
                          { color: "emerald", number: 3, title: "Long-term Vision (6-12 Months)", items: ["Scale up successful crops", "Explore value-added products", "Build marketing network", "Consider certification for organic farming"] },
                        ].map((plan, idx) => (
                          <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 5 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="relative"
                          >
                            <Card className={`backdrop-blur-sm p-4 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                              plan.color === "orange" ? "border-orange-200 bg-gradient-to-br from-orange-50/80 to-orange-100/40" :
                              plan.color === "blue" ? "border-blue-200 bg-gradient-to-br from-blue-50/80 to-blue-100/40" :
                              "border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-emerald-100/40"
                            }`}>
                              {/* Background decoration */}
                              <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${
                                plan.color === "orange" ? "bg-orange-100/20" :
                                plan.color === "blue" ? "bg-blue-100/20" :
                                "bg-emerald-100/20"
                              }`}></div>
                              <div className="relative z-10">
                              <div className="flex items-start gap-3">
                                <motion.div
                                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg ${
                                    plan.color === "orange" ? "bg-orange-500" :
                                    plan.color === "blue" ? "bg-blue-500" :
                                    "bg-emerald-500"
                                  }`}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                                >
                                  {plan.number}
                                </motion.div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground">{plan.title}</h4>
                                  <ul className="mt-1 ml-4 list-disc space-y-1 text-sm text-foreground/80">
                                    {plan.items.map((item, itemIdx) => (
                                      <motion.li
                                        key={itemIdx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + idx * 0.1 + itemIdx * 0.05 }}
                                      >
                                        {item}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Resources */}
                    <motion.div 
                      className="mt-6 space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-orange-600" />
                        Recommended Resources
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          { icon: BookOpen, title: "Courses", desc: "Enroll in Farm Academy courses for detailed training", color: "orange" },
                          { icon: Users, title: "Expert Consultancy", desc: "Connect with agriculture experts for personalized advice", color: "blue" },
                          { icon: FileText, title: "Government Schemes", desc: "Explore available subsidies and support programs", color: "green" },
                          { icon: BarChart3, title: "Market Analysis", desc: "Check crop prices and market trends", color: "purple" },
                        ].map((resource, idx) => {
                          const ResourceIcon = resource.icon;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9 + idx * 0.1 }}
                              whileHover={{ scale: 1.02, y: -2 }}
                            >
                              <Card className="border-border bg-white/95 backdrop-blur-sm p-4 relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                {/* Decorative corner */}
                                <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${
                                  resource.color === "orange" ? "bg-orange-100/20" :
                                  resource.color === "blue" ? "bg-blue-100/20" :
                                  resource.color === "green" ? "bg-green-100/20" :
                                  "bg-purple-100/20"
                                }`}></div>
                                <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                                  >
                                    {resource.color === "orange" && <ResourceIcon className="h-4 w-4 text-orange-600" />}
                                    {resource.color === "blue" && <ResourceIcon className="h-4 w-4 text-blue-600" />}
                                    {resource.color === "green" && <ResourceIcon className="h-4 w-4 text-green-600" />}
                                    {resource.color === "purple" && <ResourceIcon className="h-4 w-4 text-purple-600" />}
                                  </motion.div>
                                  <span className="font-semibold">{resource.title}</span>
                                </div>
                                <p className="text-sm text-foreground/80">{resource.desc}</p>
                                </div>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                      </div>
                  </Card>

                    <motion.div
                      className="flex justify-between mt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" onClick={handlePrevious}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                      </motion.div>
                      <div className="flex gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setCurrentStep(0);
                              setShowAnalysis(false);
                              setFormData({
                                region: "",
                                state: "",
                                district: "",
                                budget: "",
                                soilType: "",
                                experience: "",
                                farmSize: "",
                                cropsInterested: [],
                              });
                              setSelectedImages([]);
                            }}
                          >
                            Start Over
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => navigate("/farm-academy")}
                          >
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                            </motion.span>
                            Complete
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertQA;

