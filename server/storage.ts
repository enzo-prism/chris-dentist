import { 
  User, InsertUser, users,
  Appointment, InsertAppointment, appointments,
  ContactMessage, InsertContactMessage, contactMessages,
  NewsletterSubscription, InsertNewsletterSubscription, newsletterSubscriptions,
  Service, InsertService, services,
  BlogPost, InsertBlogPost, blogPosts,
  Testimonial, InsertTestimonial, testimonials
} from "@shared/schema";
import { buildInsertTestimonial, testimonialSeedData } from "@shared/testimonialsData";

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
        title: "Invisalign Clear Aligners",
        description: "Virtually invisible orthodontic treatment using custom clear aligners to straighten teeth discreetly for teens and adults.",
        image: "https://i.imgur.com/XVLlcob.jpg",
        slug: "invisalign",
        featured: true
      },
      {
        title: "Emergency Dental Care",
        description: "24/7 emergency dental services for urgent dental problems including severe toothaches, trauma, broken teeth, and infections.",
        image: "https://i.imgur.com/t6yAG3i.jpg",
        slug: "emergency-dental",
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
        title: "Invisalign in Palo Alto, CA: A Clear, Comfortable Way to Straighten Your Smile",
        content: `If you've been thinking about straightening your teeth but do not love the idea of metal braces, Invisalign clear aligners can be a smart, discreet option. For many adults and teens in Palo Alto, Invisalign offers a flexible way to improve their smile while keeping life, work, and school running normally. This guide walks through how Invisalign works, who it is best for, treatment timelines, costs in California, and what to expect when you start Invisalign with a Palo Alto dentist.

What Is Invisalign and How Does It Work?
Invisalign is an orthodontic system that uses a series of clear, custom-made plastic aligners to gradually move your teeth into better alignment. Instead of brackets and wires, you wear snug-fitting trays over your teeth and change to a new set every 1-2 weeks as your smile improves. Each set of aligners is designed from a digital 3D model of your teeth. Small, tooth-colored attachments (tiny shapes bonded to specific teeth) may be used to give the aligners extra grip, so they can rotate, tilt, or shift teeth more precisely. You will typically wear your aligners 20-22 hours per day, only removing them to eat, drink anything other than water, and brush or floss.

Key Benefits of Invisalign for Palo Alto Patients
For many patients in Palo Alto, Invisalign fits well into busy, professional, and family lives. The aligners are nearly invisible, removable for eating and cleaning, made from comfortable smooth plastic, require fewer in-office visits, and deliver predictable results thanks to digital planning. Modern Invisalign treatment uses advanced 3D software, so your dentist can preview your projected tooth movement before you even start.

Who Is a Good Candidate for Invisalign?
Invisalign can address many common orthodontic issues, including crowded teeth, gaps, mild to moderate bite problems, and relapse after previous braces. Clear aligners work best for mild to moderate concerns, while severe crowding or complex bite issues may still be better treated with traditional braces. The only way to know for sure if Invisalign is right for you is a full exam and digital scan that includes X-rays, photos, and a bite analysis. If your case is too complex for Invisalign alone, your dentist will walk you through alternatives or combined approaches.

What to Expect During Invisalign Treatment
1. Consultation and Digital Scan: Your dentist evaluates your teeth, gums, and bite, takes digital X-rays, and scans your teeth to create a 3D model. This model is used to plan how each tooth should move step by step.
2. Personalized Treatment Plan: Using Invisalign planning software, your dentist designs a custom sequence of aligners. You will see a simulation of your projected final smile and get an estimated treatment time.
3. Attachments and First Aligners: At your delivery appointment, small tooth-colored attachments may be placed on certain teeth to give your aligners extra grip. Then you will receive your first sets of trays and instructions for how long to wear each one.
4. Progress Check-Ups: You will come back periodically to make sure your teeth are tracking as planned. Minor refinements toward the end of treatment are common and help fine-tune the result.
5. Retainers to Protect Your New Smile: Once your teeth are aligned, you will switch to retainers to keep them from shifting back. Wearing retainers nightly, especially in the first year, is essential to protecting your investment long term.

How Long Does Invisalign Take?
For many adults and teens, Invisalign treatment takes about 12-18 months, though simpler cases can be shorter and more complex cases can take longer. Treatment time depends on the amount of crowding or spacing, whether your bite needs correction, and how consistently you wear your aligners (20-22 hours per day is non-negotiable). Invisalign can be faster than braces for mild issues, but braces still tend to be more efficient for very complex tooth movements.

Invisalign Costs in Palo Alto and California
Invisalign pricing is personalized, but recent data from California and Bay Area practices shows that average treatment ranges from roughly $3,500-$8,000+, with Bay Area averages often on the higher side. Your final fee depends on how many aligner sets you need, whether your bite needs correction, additional procedures, insurance contributions, and payment options. During your Invisalign consultation in Palo Alto, you should receive a written plan outlining the full cost, any insurance benefits, and available monthly payments.

Health Benefits: Invisalign Does More Than Straighten Teeth
Straighter teeth look better, but there are real oral health advantages as well. Aligned teeth make brushing and flossing easier, promote healthier bite forces that reduce uneven wear, and lower the risk of chips or fractures. Because Invisalign aligners are removable, it is easier to maintain excellent hygiene throughout treatment compared with braces, where cleaning around brackets can be challenging.

Invisalign FAQs for Palo Alto Patients
Do Invisalign aligners hurt? You can expect mild pressure for a few days each time you switch to a new set, and most patients find Invisalign more comfortable overall than braces. How many hours per day do you need to wear them? Aim for 20-22 hours daily for predictable results. Can Invisalign fix every orthodontic problem? No; severe issues may still need braces. Is Invisalign right for teens? Yes, as long as the teen can commit to wearing the aligners. Will insurance cover Invisalign? Many plans that cover orthodontics contribute toward Invisalign, often up to a lifetime maximum.

Ready to Explore Invisalign in Palo Alto, CA?
If you are curious whether Invisalign is right for you, the next step is a personalized consultation with a dentist who provides Invisalign treatment in Palo Alto. During your visit, you can expect a thorough exam, digital imaging, a custom treatment plan with an estimated timeline, and a transparent discussion of costs, insurance, and payment options. Call the office at (650) 326-6319 or request an appointment online to schedule your Invisalign consultation in Palo Alto, CA.`,
        image: "https://i.imgur.com/XVLlcob.jpg",
        date: "January 15, 2025",
        slug: "invisalign-palo-alto",
        category: "Invisalign",
        readTime: 9
      }
    ];

    blogPostsList.forEach(post => {
      this.createBlogPost(post);
    });
  }

  private initializeTestimonials() {
    testimonialSeedData.forEach((seed, index) => {
      void this.createTestimonial(buildInsertTestimonial(seed, index));
    });
  }
}

export const storage = new MemStorage();
