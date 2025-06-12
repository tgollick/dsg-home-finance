"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CalendarIcon, LucideMoveRight, X } from "lucide-react";
import { trpc } from "../../../../utils/providers/TrpcProviders";
import confetti from "canvas-confetti";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

// Updated schema without consent field
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  emailAddress: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Please enter a valid phone number" }),
  currentSituation: z
    .string()
    .min(1, { message: "Please enter your current situation" }),
  specificQuestions: z.string(),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string().min(1, { message: "Please enter a time" }),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<z.infer<
    typeof formSchema
  > | null>(null);

  const addContact = trpc.contactRouter.addContact.useMutation({
    onSuccess: () => {
      toast({
        title: "Contact Message Sent",
        description: "Your message has been sent to David!",
      });

      shootConfetti();
      setLoading(false);
      form.reset();
      setShowPrivacyModal(false);
      setPrivacyConsent(false);
      setPendingFormData(null);
    },
    onError: () => {
      toast({
        title: "Contact Message Error",
        description:
          "Your contact has not been sent. Please contact David at enquires@dsghomefinance.co.uk",
        variant: "destructive",
      });
      setLoading(false);
      setShowPrivacyModal(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      emailAddress: "",
      phoneNumber: "",
      currentSituation: "",
      specificQuestions: "",
      date: getNextBusinessDay(),
      time: "",
    },
  });

  const shootConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // Handle initial form submission - show privacy modal
  function onSubmit(values: z.infer<typeof formSchema>) {
    setPendingFormData(values);
    setShowPrivacyModal(true);
  }

  // Handle final submission after privacy consent
  function handleFinalSubmit() {
    if (!privacyConsent || !pendingFormData) {
      toast({
        title: "Privacy Consent Required",
        description: "Please confirm you have read the privacy information.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    addContact.mutate({
      fullname: pendingFormData.firstName,
      email: pendingFormData.emailAddress,
      phone: pendingFormData.phoneNumber,
      situation: pendingFormData.currentSituation,
      other: pendingFormData.specificQuestions,
      date: pendingFormData.date,
      time: pendingFormData.time,
    });
  }

  function getNextBusinessDay() {
    const today = new Date();
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
      nextDay.setDate(nextDay.getDate() + 1);
    }

    return nextDay;
  }

  return (
    <>
      <div
        className="
          absolute 
          xl:top-60
          top-[32rem]
          md:top-[38rem]
          lg:top-[40rem]
          right-0
          w-full 
          max-w-[1200px]
          xl:max-w-lg
          p-6 
          bg-white 
          shadow-md 
          rounded-md
          z-50
          font-sans
        "
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-4">Get in Contact</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Fullname</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 bg-gray-200"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 bg-gray-200"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 bg-gray-200"
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentSituation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Current Situation</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-200 py-6"
                      placeholder="Current Situation"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    For example, First Time Buyer, Selling House, Remortaging
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specificQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Any Specific Questions?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-gray-200 h-[200px]"
                      placeholder="Any Specific Questions?"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any questions you might want answered in the first chat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full bg-gray-200 py-6 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) => {
                          const today = new Date();
                          const tomorrow = new Date(today);
                          tomorrow.setDate(today.getDate() + 1);
                          const day = date.getDay();
                          return date < tomorrow || day === 0 || day === 6;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date that works best for David to give you a call.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Time</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-gray-200 py-6 text-sm w-full text-black hover:bg-white">
                          {field.value || "Select a time"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {Array.from({ length: 17 }, (_, i) => {
                          const hour = Math.floor(i / 2) + 9;
                          const minute = i % 2 === 0 ? "00" : "30";
                          const timeString = `${hour}:${minute.padStart(2, "0")}`;
                          return (
                            <DropdownMenuItem
                              key={timeString}
                              onClick={() => field.onChange(timeString)}
                            >
                              {timeString}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormDescription>
                    The time that works best for you!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-lg h-full py-4 bg-[#F49FB7] hover:bg-[#ee7195]"
            >
              <span className="flex items-center gap-2">
                Send Message to David
                <LucideMoveRight />
              </span>
            </Button>
          </form>
        </Form>
      </div>

      {/* Custom Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1e1e1e] bg-opacity-[0.98] flex items-center justify-center z-[1002] p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPrivacyModal(false);
                setPrivacyConsent(false);
                setPendingFormData(null);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="bg-[#1e1e1e] text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-white">
                    Privacy Information
                  </h2>
                  <p className="text-sm text-white/80 mt-1">
                    Please read the following information about how we handle
                    your data.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPrivacyModal(false);
                    setPrivacyConsent(false);
                    setPendingFormData(null);
                  }}
                  className="text-white hover:text-[#F49FB7] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4 text-sm leading-relaxed text-gray-800">
                  <p>
                    <strong>DSG Home Finance</strong> will be what is known as
                    the &apos;controller&apos; of the personal data you provide
                    to us. We only collect basic personal data about you which
                    does not include any special types of information or
                    location-based information.
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2 text-[#1e1e1e]">
                      Why do you need my data and what will it be used for?
                    </h4>
                    <p>
                      We need to know your basic personal data so we can contact
                      you and respond to your message, request or query. All the
                      personal data we process is processed by our staff in the
                      UK.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-[#1e1e1e]">
                      Who is my data shared with?
                    </h4>
                    <p>
                      Your data will only be shared with third parties if this
                      is necessary to respond to your request. If this is the
                      case, we will seek your permission before passing on your
                      details.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-[#1e1e1e]">
                      How long do you keep my data for?
                    </h4>
                    <p>
                      We may store your data for up to six years past the end of
                      any business relationship, after which time it will be
                      securely destroyed. If you would no longer like us to
                      process your data at any time, you have the right to
                      object to processing your data. To do this, please contact{" "}
                      <strong className="text-[#F49FB7]">
                        david@dsgmortgages.com
                      </strong>
                      .
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-[#1e1e1e]">
                      What are my rights?
                    </h4>
                    <p>
                      You have the right to object to the processing of your
                      data. You also have the right to request access to your
                      data at any time. You have the right to rectification
                      and/or erasure of personal data or restriction of
                      processing. If you wish to raise a concern related to how
                      we have handled your personal data, you can contact us to
                      have the matter investigated at{" "}
                      <strong className="text-[#F49FB7]">
                        compliance@sdlgroup.co.uk
                      </strong>
                      . If you are not satisfied with our response or believe we
                      are processing your personal data not in accordance with
                      the law, you can complain to the information
                      commissioner&apos;s office:{" "}
                      <strong className="text-[#F49FB7]">
                        https://ico.org.uk
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3 pt-6 border-t border-gray-200 mt-6">
                  <Checkbox
                    id="privacy-consent"
                    checked={privacyConsent}
                    onCheckedChange={(checked) => setPrivacyConsent(!!checked)}
                    className="w-5 h-5 mt-0.5"
                  />
                  <label
                    htmlFor="privacy-consent"
                    className="text-sm leading-tight text-gray-800 cursor-pointer"
                  >
                    I confirm that I have read and understood the privacy
                    information above.
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-6 flex gap-3 justify-end border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPrivacyModal(false);
                    setPrivacyConsent(false);
                    setPendingFormData(null);
                  }}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFinalSubmit}
                  disabled={!privacyConsent || loading}
                  className="bg-[#F49FB7] hover:bg-[#ee7195] px-6"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Sending message...
                      <span className="loader"></span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Confirm & Send Message
                      <LucideMoveRight />
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
