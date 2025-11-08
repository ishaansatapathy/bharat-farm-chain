import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  Users,
  Award,
  MessageSquare,
  TrendingUp,
  Sprout,
  Droplets,
  Bug,
  Sun,
  Leaf,
  ArrowRight,
  Play,
  Clock,
  Star,
  CheckCircle2,
  Sparkles,
  X,
  ExternalLink,
  Download,
  Languages,
  FileCheck,
  Shield,
} from "lucide-react";
import Chatbot from "@/components/ui/chatbot";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FarmAcademy = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [openChatbot, setOpenChatbot] = useState(false);
  
  // Get detailed information for each feature
  const getFeatureDetails = (featureTitle: string) => {
    const details: Record<string, {
      title: string;
      description: string;
      videos?: Array<{ title: string; url: string; duration: string; language: string }>;
      studyMaterials?: Array<{ title: string; type: string; downloadUrl: string; description: string }>;
      certificateRequirements?: Array<{ course: string; requirements: string[]; certificateType: string }>;
    }> = {
      "Video Lessons": {
        title: "Video Lessons",
        description: "Watch expert-led farming tutorials in Hindi, English, and Kannada. Learn practical techniques through step-by-step video demonstrations.",
        videos: [
          {
            title: "Modern Farming Techniques - Complete Guide",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            duration: "45 min",
            language: "Hindi"
          },
          {
            title: "Organic Farming Methods for Beginners",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            duration: "32 min",
            language: "English"
          },
          {
            title: "Soil Testing and Management",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            duration: "28 min",
            language: "Kannada"
          },
          {
            title: "Drip Irrigation System Setup",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            duration: "25 min",
            language: "Hindi"
          },
          {
            title: "Pest and Disease Control",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            duration: "38 min",
            language: "English"
          },
          {
            title: "Crop Rotation Planning",
            url: "https://www.youtube.com/embed/9bZkp7q19f0",
            duration: "20 min",
            language: "Kannada"
          }
        ]
      },
      "Study Materials": {
        title: "Study Materials",
        description: "Download comprehensive farming guides, PDFs, and reference materials to enhance your learning.",
        studyMaterials: [
          {
            title: "Complete Guide to Modern Farming",
            type: "PDF Guide",
            downloadUrl: "#",
            description: "Comprehensive 150-page guide covering all aspects of modern farming techniques, crop management, and best practices."
          },
          {
            title: "Soil Health Management Manual",
            type: "PDF Manual",
            downloadUrl: "#",
            description: "Detailed manual on soil testing, nutrient management, pH balancing, and organic matter improvement."
          },
          {
            title: "Crop Calendar 2024",
            type: "PDF Calendar",
            downloadUrl: "#",
            description: "Month-by-month crop planning calendar with sowing dates, harvesting periods, and seasonal recommendations."
          },
          {
            title: "Pest & Disease Identification Chart",
            type: "PDF Chart",
            downloadUrl: "#",
            description: "Visual identification guide for common pests and diseases with treatment recommendations and prevention methods."
          },
          {
            title: "Fertilizer Application Guide",
            type: "PDF Guide",
            downloadUrl: "#",
            description: "Complete guide on NPK fertilizers, organic fertilizers, application methods, and dosage calculations."
          },
          {
            title: "Irrigation Systems Handbook",
            type: "PDF Handbook",
            downloadUrl: "#",
            description: "Technical handbook covering drip irrigation, sprinkler systems, water management, and installation guides."
          },
          {
            title: "Organic Farming Certification Guide",
            type: "PDF Guide",
            downloadUrl: "#",
            description: "Step-by-step guide to organic farming certification, requirements, and compliance standards."
          },
          {
            title: "Market Price Trends & Analysis",
            type: "PDF Report",
            downloadUrl: "#",
            description: "Monthly market analysis report with crop prices, demand trends, and selling strategies."
          }
        ]
      },
      "Certificates": {
        title: "Certificates",
        description: "Earn verified certificates upon completing courses. Each course has specific requirements that must be met to receive your certificate.",
        certificateRequirements: [
          {
            course: "Modern Farming Techniques",
            requirements: [
              "Complete all 12 video lessons",
              "Pass final assessment with 70% or higher",
              "Submit practical assignment",
              "Complete course within 4 weeks"
            ],
            certificateType: "Course Completion Certificate"
          },
          {
            course: "Soil Health Management",
            requirements: [
              "Complete all 10 video lessons",
              "Pass all module quizzes",
              "Submit soil analysis report",
              "Complete course within 3 weeks"
            ],
            certificateType: "Specialization Certificate"
          },
          {
            course: "Pest & Disease Control",
            requirements: [
              "Complete all 8 video lessons",
              "Pass identification test",
              "Submit case study",
              "Complete course within 2 weeks"
            ],
            certificateType: "Course Completion Certificate"
          },
          {
            course: "Climate-Smart Agriculture",
            requirements: [
              "Complete all 15 video lessons",
              "Pass advanced assessment with 80% or higher",
              "Submit research project",
              "Complete course within 5 weeks"
            ],
            certificateType: "Advanced Certificate"
          },
          {
            course: "Complete Farm Academy Program",
            requirements: [
              "Complete all 4 courses",
              "Earn all individual course certificates",
              "Pass comprehensive final exam",
              "Submit final project"
            ],
            certificateType: "Master Farmer Certificate"
          }
        ]
      }
    };
    return details[featureTitle] || null;
  };
  
  const courses = [
    {
      id: 1,
      title: "Modern Farming Techniques",
      description: "Learn cutting-edge farming methods to boost your yield",
      duration: "4 weeks",
      lessons: 12,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop",
      icon: Sprout,
      color: "emerald",
      students: 1234,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Soil Health Management",
      description: "Master soil testing, nutrients, and organic practices",
      duration: "3 weeks",
      lessons: 10,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop",
      icon: Droplets,
      color: "blue",
      students: 987,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Pest & Disease Control",
      description: "Identify and manage crop pests using eco-friendly methods",
      duration: "2 weeks",
      lessons: 8,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=250&fit=crop",
      icon: Bug,
      color: "red",
      students: 756,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Climate-Smart Agriculture",
      description: "Adapt to climate change with resilient farming practices",
      duration: "5 weeks",
      lessons: 15,
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=250&fit=crop",
      icon: Sun,
      color: "amber",
      students: 543,
      rating: 4.9,
    },
  ];

  const features = [
    {
      icon: Video,
      title: "Video Lessons",
      description: "HD videos in Hindi, English & Kannada",
    },
    {
      icon: FileText,
      title: "Study Materials",
      description: "Downloadable guides & PDFs",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Live Q&A with agriculture experts",
    },
      {
        icon: MessageSquare,
        title: "Chatbot",
        description: "AI-powered farming assistant",
      },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn verified completion certificates",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; badge: string }> = {
      emerald: { bg: "bg-emerald-500", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
      blue: { bg: "bg-blue-500", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
      red: { bg: "bg-red-500", text: "text-red-600", badge: "bg-red-100 text-red-700" },
      amber: { bg: "bg-amber-500", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/30 via-white to-orange-50/30">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Learn. Grow. Prosper.</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Farm Academy
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Master modern farming with expert-led courses in your language
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 shadow-lg">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>10,000+ Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                <span>500+ Video Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Certified Courses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {features.map((feature) => (
              <Card 
                key={feature.title} 
                className="border-orange-100 bg-white p-6 shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-orange-500 group"
                onClick={() => {
                      if (feature.title === "Expert Support") {
                        navigate("/farm-academy/expert-qa");
                      } else if (feature.title === "Chatbot") {
                        setOpenChatbot(true);
                      } else {
                        setSelectedFeature(feature.title);
                      }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-orange-100 p-3 text-orange-600 group-hover:bg-orange-200 transition-colors">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">{feature.title}</h3>
                      <ArrowRight className="h-4 w-4 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                    <Button 
                      size="sm" 
                      className="mt-3 bg-orange-500 hover:bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (feature.title === "Expert Support") {
                          navigate("/farm-academy/expert-qa");
                        } else if (feature.title === "Chatbot") {
                          setOpenChatbot(true);
                        } else {
                          setSelectedFeature(feature.title);
                        }
                      }}
                    >
                      {feature.title === "Expert Support" ? "Get Started" : "Learn More"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Popular Courses</h2>
            <p className="mt-2 text-muted-foreground">Learn from agriculture experts and boost your farm's productivity</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => {
              const colors = getColorClasses(course.color);
              const CourseIcon = course.icon;
              
              return (
                <Card key={course.id} className="group overflow-hidden border-border bg-white shadow-sm transition-all hover:shadow-lg">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`} />
                    <Badge className={`absolute top-3 right-3 ${colors.badge}`}>
                      {course.level}
                    </Badge>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className={`rounded-lg ${colors.bg} p-2 text-white`}>
                        <CourseIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-foreground">{course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.students})</span>
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <span className="text-xs">Enroll</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-none bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-xl">
            <div className="p-8 md:p-12 text-center text-white">
              <GraduationCap className="mx-auto h-16 w-16 mb-6" />
              <h2 className="text-3xl font-bold md:text-4xl">Ready to Transform Your Farm?</h2>
              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of farmers who are already learning and earning more with Farm Academy
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 shadow-lg">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get Started Now
                </Button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Free to Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Learn Anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Feature Details Dialog */}
      <Dialog open={selectedFeature !== null} onOpenChange={(open) => !open && setSelectedFeature(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedFeature && (() => {
            const details = getFeatureDetails(selectedFeature);
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
                      onClick={() => setSelectedFeature(null)}
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
                  {/* Video Lessons Content */}
                  {details.videos && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Video className="h-5 w-5 text-orange-600" />
                        Available Video Lessons
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {details.videos.map((video, idx) => (
                          <div key={idx} className="bg-white rounded-lg border-2 border-orange-200/60 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            <div className="aspect-video bg-black">
                              <iframe
                                src={video.url}
                                title={video.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                                  <Languages className="h-3 w-3 mr-1" />
                                  {video.language}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {video.duration}
                                </span>
                              </div>
                              <h4 className="font-semibold text-foreground text-sm">{video.title}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Study Materials Content */}
                  {details.studyMaterials && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-orange-600" />
                        Downloadable Study Materials
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {details.studyMaterials.map((material, idx) => (
                          <Card key={idx} className="p-4 border-2 border-orange-200/60 hover:border-orange-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="bg-orange-100 p-2 rounded-lg">
                                <FileText className="h-5 w-5 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs">
                                    {material.type}
                                  </Badge>
                                </div>
                                <h4 className="font-semibold text-foreground text-sm mb-2">{material.title}</h4>
                                <p className="text-xs text-muted-foreground mb-3">{material.description}</p>
                                <Button
                                  size="sm"
                                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                  onClick={() => {
                                    // In a real app, this would trigger the download
                                    alert(`Downloading ${material.title}...`);
                                  }}
                                >
                                  <Download className="h-3 w-3 mr-2" />
                                  Download PDF
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certificate Requirements Content */}
                  {details.certificateRequirements && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-orange-600" />
                        Certificate Requirements
                      </h3>
                      <div className="space-y-4">
                        {details.certificateRequirements.map((cert, idx) => (
                          <Card key={idx} className="p-5 border-2 border-orange-200/60">
                            <div className="flex items-start gap-4">
                              <div className="bg-orange-100 p-3 rounded-lg">
                                <Award className="h-6 w-6 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-foreground text-base">{cert.course}</h4>
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                                    {cert.certificateType}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">Complete the following to earn your certificate:</p>
                                <div className="space-y-2">
                                  {cert.requirements.map((req, reqIdx) => (
                                    <div key={reqIdx} className="flex items-start gap-2 p-2 bg-orange-50/50 rounded-lg">
                                      <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-foreground/80 font-medium">{req}</span>
                                    </div>
                                  ))}
                                </div>
                                <Button
                                  size="sm"
                                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                                  onClick={() => {
                                    navigate("/farm-academy");
                                  }}
                                >
                                  Start Course
                                  <ArrowRight className="h-3 w-3 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

  {/* Chatbot widget */}
  <Chatbot open={openChatbot} onOpenChange={setOpenChatbot} />

      <Footer />
    </div>
  );
};

export default FarmAcademy;

