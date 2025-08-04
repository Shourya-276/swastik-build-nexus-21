import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Upload, User, Building, Briefcase, Users, Award, Calendar, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Build Your Career
                  <span className="block text-gray-800">
                    with Swastik Group
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  At Swastik Group, we're not just shaping skylines—we're shaping futures. With over 25 years of legacy, we offer a workplace where integrity, excellence, and innovation come together to let our talented team build something truly impactful.
                </p>
              </div>
            </div>
            
            <div className="grid gap-6">
              {/* Three Blue Cards */}
              <div className="grid gap-4">
                <Card className="bg-blue-600 text-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Building className="w-8 h-8 text-white mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold mb-2">Outstanding Properties</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          Immerse in best-in-class infrastructure that push boundaries and unlock new real estate trends that match your expectations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Briefcase className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-base font-bold mb-2">Growth Opportunities</h3>
                          <p className="text-blue-100 text-xs leading-relaxed">
                            We offer progressive career advancement through innovative role design.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Users className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-base font-bold mb-2">Flexible Work Environment</h3>
                          <p className="text-blue-100 text-xs leading-relaxed">
                            Discover balance between work environment to offer your best work.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative -mt-10 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-blue-600 rounded-3xl shadow-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center text-white">
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold">25+</div>
                <div className="text-blue-100 text-sm">Years of Legacy</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold">1.5</div>
                <div className="text-blue-100 text-sm">Million Sq.ft.</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold">1500+</div>
                <div className="text-blue-100 text-sm">Happy Families</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold">6.5</div>
                <div className="text-blue-100 text-sm">Lakh Sq.ft.</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold">22</div>
                <div className="text-blue-100 text-sm">Projects Delivered</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold">7</div>
                <div className="text-blue-100 text-sm">Projects under Construction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Detail Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-2xl mx-auto">
            <div 
              className="bg-white shadow-2xl relative"
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '120px',
                borderBottomLeftRadius: '120px',
                borderBottomRightRadius: '120px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              }}
            >
              <div className="p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Career Detail Form</h2>
                  <p className="text-gray-600">Please fill your details below</p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <Input 
                        type="text"
                        className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="First Name"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <Input 
                        type="text"
                        className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <Input 
                        type="tel"
                        className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="Contact Number"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <Input 
                        type="email"
                        className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="Email ID"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input 
                      type="text"
                      className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Message"
                    />
                  </div>

                  <div className="text-center">
                    <Button 
                      type="button"
                      className="w-full h-12 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded-xl border border-blue-200 transition-all duration-300 mb-6"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Document
                    </Button>

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto px-12 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Enquiry Now
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 border-r border-gray-200">
              <div className="text-sm font-medium text-gray-600">MEP Consultant</div>
              <div className="text-xs text-gray-500 mt-1">M/s Nagaraj Engineers</div>
            </div>
            <div className="p-4 border-r border-gray-200">
              <div className="text-sm font-medium text-gray-600">PMC</div>
              <div className="text-xs text-gray-500 mt-1">Ensaffen Project Management</div>
            </div>
            <div className="p-4 border-r border-gray-200">
              <div className="text-sm font-medium text-gray-600">Sales Consultant</div>
              <div className="text-xs text-gray-500 mt-1">Kamaths Varnas Engineer</div>
            </div>
            <div className="p-4 border-r border-gray-200">
              <div className="text-sm font-medium text-gray-600">Legal Consultant</div>
              <div className="text-xs text-gray-500 mt-1">Litigation Law Partners</div>
            </div>
            <div className="p-4">
              <div className="text-sm font-medium text-gray-600">Design Architect</div>
              <div className="text-xs text-gray-500 mt-1">Kamath Architect</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer Section */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+91-22-4068-0000</span>
              </div>
              <div className="text-sm text-blue-100">Give Us A Call</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="font-medium">sales@swastikgroup.in</span>
              </div>
              <div className="text-sm text-blue-100">Drop Us A Line</div>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300"
              >
                Enquiry Now
              </Button>
              <div className="text-sm text-blue-100">Fill Out Enquiry Forms Instantly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Corporate Office</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>SWASTIK REAL ESTATES AND DEVELOPERS</p>
                <p>Swastik Complex, Tembhi Naka, Station Road</p>
                <p>1ST Floor, Shop-8, Opp. Tembhi Naka Flyover, Vani</p>
                <p>Dahisar East, Mumbai 400068, INDIA</p>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Quick Links</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>1 BHK Flats</li>
                    <li>2 BHK Flats</li>
                    <li>3 BHK Flats</li>
                    <li>Gallery</li>
                    <li>Amenities</li>
                    <li>Vahansar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">&nbsp;</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>2 BHK Flats</li>
                    <li>Gallery</li>
                    <li>Pondicherry</li>
                    <li>Amenities</li>
                    <li>Gachibowl</li>
                    <li>Vahansar</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">&nbsp;</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>2 BHK Flats</li>
                    <li>3 BHK Flats</li>
                    <li>Gallery</li>
                    <li>Amenities</li>
                    <li>Vahansar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              <p>Over 25 years of trust, timely delivery, transparent transactions across Malad/Dahisar/Borivali</p>
              <p className="mt-2">Copyright 2023 | All Rights Reserved by Swastik Group | Developed by Signature Advertising</p>
            </div>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">t</span>
              </div>
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">in</span>
              </div>
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">ig</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;