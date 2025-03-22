import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertNewsletterSubscriptionSchema, InsertNewsletterSubscription } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertNewsletterSubscription>({
    resolver: zodResolver(insertNewsletterSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: (data: InsertNewsletterSubscription) => apiRequest("POST", "/api/newsletter", data),
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "success",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Error",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertNewsletterSubscription) => {
    setIsSubmitting(true);
    subscriptionMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
        <div className="flex">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input 
                    placeholder="Your email address" 
                    type="email" 
                    className="w-full rounded-r-none focus:ring-primary text-[#333333]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="bg-[#00AA90] hover:bg-teal-700 text-white rounded-l-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : "Subscribe"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewsletterForm;
