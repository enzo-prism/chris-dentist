import { 
  User, InsertUser, users,
  Appointment, InsertAppointment, appointments,
  ContactMessage, InsertContactMessage, contactMessages,
  NewsletterSubscription, InsertNewsletterSubscription, newsletterSubscriptions,
  Service, InsertService, services,
  BlogPost, InsertBlogPost, blogPosts,
  Testimonial, InsertTestimonial, testimonials
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Appointment methods
  getAppointments(): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;

  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Newsletter subscription methods
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;

  // Service methods
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Search methods
  search(query: string): Promise<{
    services: Service[],
    blogPosts: BlogPost[]
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private services: Map<number, Service>;
  private blogPosts: Map<number, BlogPost>;
  private testimonials: Map<number, Testimonial>;
  
  private userCurrentId: number;
  private appointmentCurrentId: number;
  private contactMessageCurrentId: number;
  private newsletterSubscriptionCurrentId: number;
  private serviceCurrentId: number;
  private blogPostCurrentId: number;
  private testimonialCurrentId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscriptions = new Map();
    this.services = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();

    this.userCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.contactMessageCurrentId = 1;
    this.newsletterSubscriptionCurrentId = 1;
    this.serviceCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.testimonialCurrentId = 1;

    // Initialize with some sample data
    this.initializeServices();
    this.initializeBlogPosts();
    this.initializeTestimonials();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Appointment methods
  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(appointmentData: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const appointment: Appointment = { 
      ...appointmentData, 
      id, 
      notes: appointmentData.notes === undefined ? null : appointmentData.notes,
      createdAt: new Date() 
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(messageData: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const message: ContactMessage = { 
      ...messageData, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  // Newsletter subscription methods
  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async getNewsletterSubscription(id: number): Promise<NewsletterSubscription | undefined> {
    return this.newsletterSubscriptions.get(id);
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === email,
    );
  }

  async createNewsletterSubscription(subscriptionData: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if already exists
    const existing = await this.getNewsletterSubscriptionByEmail(subscriptionData.email);
    if (existing) {
      return existing;
    }

    const id = this.newsletterSubscriptionCurrentId++;
    const subscription: NewsletterSubscription = { 
      ...subscriptionData, 
      id, 
      createdAt: new Date() 
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(
      (service) => service.slug === slug,
    );
  }

  async createService(serviceData: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    // Ensure featured field is populated with default if undefined
    const serviceFeatured = serviceData.featured === undefined ? false : serviceData.featured;
    const service: Service = { ...serviceData, id, featured: serviceFeatured };
    this.services.set(id, service);
    return service;
  }

  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }

  async createBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    // Ensure optional fields are populated with defaults if undefined
    const category = postData.category === undefined ? null : postData.category;
    const readTime = postData.readTime === undefined ? null : postData.readTime;
    const post: BlogPost = { ...postData, id, category, readTime };
    this.blogPosts.set(id, post);
    return post;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const testimonial: Testimonial = { ...testimonialData, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Search methods
  async search(query: string): Promise<{ services: Service[], blogPosts: BlogPost[] }> {
    const lowerQuery = query.toLowerCase();
    
    const filteredServices = Array.from(this.services.values()).filter(
      (service) => 
        service.title.toLowerCase().includes(lowerQuery) || 
        service.description.toLowerCase().includes(lowerQuery)
    );
    
    const filteredBlogPosts = Array.from(this.blogPosts.values()).filter(
      (post) => 
        post.title.toLowerCase().includes(lowerQuery) || 
        post.content.toLowerCase().includes(lowerQuery)
    );
    
    return {
      services: filteredServices,
      blogPosts: filteredBlogPosts
    };
  }

  // Initialize sample data
  private initializeServices() {
    const servicesList: InsertService[] = [
      {
        title: "Preventive Dentistry",
        description: "Regular check-ups, cleanings, and screenings to maintain optimal oral health and prevent issues before they start.",
        image: "https://i.imgur.com/MuWZWEY.jpg",
        slug: "preventive-dentistry",
        featured: true
      },
      {
        title: "Cosmetic Dentistry",
        description: "Teeth whitening, veneers, and other aesthetic procedures to enhance your smile and boost your confidence.",
        image: "https://cdn.prod.website-files.com/6647633c9b317c62a46de335/67e98b5ee7cebcc5e1b3eae3_mode%3B.png",
        slug: "cosmetic-dentistry",
        featured: true
      },
      {
        title: "Restorative Dentistry",
        description: "Fillings, crowns, bridges, and implants to repair damage and restore full function to your teeth.",
        image: "https://i.imgur.com/HcIu4Tr.jpg",
        slug: "restorative-dentistry",
        featured: false
      },
      {
        title: "Pediatric Dentistry",
        description: "Child-friendly dental care in a comfortable environment to establish good oral health habits early.",
        image: "https://i.imgur.com/3iTw6Dx.jpg",
        slug: "pediatric-dentistry",
        featured: true
      },
      {
        title: "Orthodontics",
        description: "Clear aligners and traditional braces to correctly align teeth for improved function and appearance.",
        image: "https://i.imgur.com/XVLlcob.jpg",
        slug: "orthodontics",
        featured: false
      },
      {
        title: "Emergency Dental Care",
        description: "Prompt attention for dental emergencies such as toothaches, broken teeth, or other urgent dental issues.",
        image: "https://i.imgur.com/t6yAG3i.jpg",
        slug: "emergency-dental-care",
        featured: true
      }
    ];

    servicesList.forEach(service => {
      this.createService(service);
    });
  }

  private initializeBlogPosts() {
    const blogPostsList: InsertBlogPost[] = [
      {
        title: "The Link Between Oral Health and Overall Wellness",
        content: "Discover how maintaining good oral hygiene practices can significantly impact your general health and prevent various systemic conditions.",
        image: "https://i.imgur.com/sW9DVZF.png",
        date: "June 15, 2023",
        slug: "oral-health-overall-wellness",
        category: "Wellness",
        readTime: 5
      },
      {
        title: "Advances in Invisible Orthodontics",
        content: "Learn about the latest innovations in clear aligner technology and how they're making orthodontic treatment more comfortable and discreet than ever.",
        image: "https://i.imgur.com/XVLlcob.jpg",
        date: "May 22, 2023",
        slug: "advances-invisible-orthodontics",
        category: "Orthodontics",
        readTime: 7
      },
      {
        title: "Nutrition Tips for Healthier Teeth",
        content: "Explore which foods promote dental health and which ones to avoid to maintain strong teeth and gums for years to come.",
        image: "https://i.imgur.com/nGlhUdH.png",
        date: "April 10, 2023",
        slug: "nutrition-tips-healthier-teeth",
        category: "Nutrition",
        readTime: 4
      }
    ];

    blogPostsList.forEach(post => {
      this.createBlogPost(post);
    });
  }

  private initializeTestimonials() {
    const testimonialsList: InsertTestimonial[] = [
      {
        name: "Sarah L.",
        location: "Palo Alto, CA",
        rating: 5,
        text: "Dr. Wong and his staff provided exceptional care for my dental implant procedure. They explained everything clearly, made sure I was comfortable, and the results are fantastic. Highly recommend!",
        image: "https://i.imgur.com/mVvasLs.png"
      },
      {
        name: "Michael T.",
        location: "Menlo Park, CA",
        rating: 5,
        text: "As someone with dental anxiety, I can't express how comfortable Dr. Wong made me feel. His practice uses the latest technology, and the virtual consultation option was extremely convenient for my busy schedule.",
        image: "https://i.imgur.com/4Hp7oKM.png"
      },
      {
        name: "Jennifer R.",
        location: "Palo Alto, CA",
        rating: 5,
        text: "Our entire family sees Dr. Wong, and we couldn't be happier. From my 5-year-old's first visit to my husband's complex crown work, everyone receives personalized attention. The online patient portal makes managing appointments easy.",
        image: "https://i.imgur.com/iqBXT9y.png"
      }
    ];

    testimonialsList.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
