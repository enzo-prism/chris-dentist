import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertAppointmentSchema, InsertAppointment } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { trackGAEvent } from "@/lib/analytics";
import { officeInfo } from "@/lib/data";

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      type: "in-person",
      notes: "",
    },
  });

  const appointmentMutation = useMutation({
    mutationFn: (data: InsertAppointment) => apiRequest("POST", "/api/appointments", data),
    onSuccess: () => {
      toast({
        title: "Appointment scheduled!",
        description: "You will receive a confirmation email shortly.",
        variant: "default",
      });
      trackGAEvent("booked_appointment");
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error scheduling appointment:", error);
      toast({
        title: "Error",
        description: "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertAppointment) => {
    setIsSubmitting(true);
    appointmentMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[#333333] font-semibold">Appointment Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="in-person" id="in-person" />
                      </FormControl>
                      <FormLabel htmlFor="in-person" className="cursor-pointer font-normal flex-1 text-center py-3 border rounded-md peer-checked:bg-blue-50 peer-checked:border-primary peer-checked:text-primary">
                        In-Person Visit
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="virtual" id="virtual" />
                      </FormControl>
                      <FormLabel htmlFor="virtual" className="cursor-pointer font-normal flex-1 text-center py-3 border rounded-md peer-checked:bg-blue-50 peer-checked:border-primary peer-checked:text-primary">
                        Virtual Consultation
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333333] font-semibold">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333333] font-semibold">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#333333] font-semibold">Phone Number</FormLabel>
              <FormControl>
                <Input placeholder={officeInfo.phone} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333333] font-semibold">Service Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cleaning">Cleaning & Check-up</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Consultation</SelectItem>
                    <SelectItem value="emergency">Emergency Care</SelectItem>
                    <SelectItem value="orthodontics">Orthodontics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel className="text-[#333333] font-semibold">Preferred Date & Time</FormLabel>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#333333] font-semibold">Additional Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please share any specific concerns or questions" 
                  rows={3} 
                  {...field} 
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacy"
            required
            className="mt-1"
          />
          <label
            htmlFor="privacy"
            className="text-sm text-[#333333] cursor-pointer"
          >
            I understand that this information is protected by HIPAA and consent to receiving communications via email and text message.
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#E63946] hover:bg-red-600 text-white font-semibold py-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Scheduling..." : "Book Appointment"}
        </Button>

        <p className="text-sm text-[#333333] text-center">
          You will receive a confirmation email once your appointment is scheduled.
        </p>
      </form>
    </Form>
  );
};

export default AppointmentForm;
