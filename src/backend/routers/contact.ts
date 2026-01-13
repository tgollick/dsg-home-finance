import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/backend/trpc/init";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

type UserContact = {
  other: string;
  id: string;
  fullname: string;
  email: string;
  phone: string;
  situation: string;
  date: string;
  time: string;
  contacted: boolean;
  month: Date;
  updatedAt: Date;
  count: number;
};

export const contactRouter = createTRPCRouter({
  getContacts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userContact.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  addContact: publicProcedure
    .input(
      z.object({
        fullname: z.string(),
        email: z.string().email(),
        phone: z.string(),
        situation: z.string(),
        other: z.string(),
        date: z.date(),
        time: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { fullname, email, phone, situation, other, date, time } = input;

      const names = input.fullname.trim().split(/\s+/);
      const firstName = names[0] || "";
      const lastName = names.length > 1 ? names[names.length - 1] : "";

      try {
        const newContact = await ctx.prisma.userContact.create({
          data: {
            fullname,
            email,
            phone,
            situation,
            other,
            date: date.toLocaleDateString(),
            time,
          },
        });

        const generateContactEmail = (
          name: string,
          date: string,
          time: string
        ) => {
          return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Mortgage Consultation Confirmation</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        
                body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f3f4f6;
                  margin: 0;
                  padding: 0;
                  color: #222;
                }
        
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  padding: 32px;
                  border-radius: 16px;
                  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
                  overflow: hidden;
                  position: relative;
                }
        
                .header {
                  background: linear-gradient(135deg, #f59fb7, #d96090);
                  padding: 28px;
                  text-align: center;
                  color: white;
                  font-size: 26px;
                  font-weight: bold;
                  border-radius: 16px 16px 0 0;
                  box-shadow: inset 0px 0px 12px rgba(255, 255, 255, 0.3);
                }
        
                .content {
                  padding: 40px 20px;
                  text-align: center;
                  line-height: 1.6;
                }
        
                .content h2 {
                  font-size: 22px;
                  font-weight: 600;
                  color: #222;
                }
        
                .content p {
                  font-size: 16px;
                  color: #555;
                  margin: 10px 0;
                }
        
                .appointment-details {
                  margin-top: 24px;
                  padding: 20px;
                  background: rgba(244, 159, 183, 0.1);
                  border-radius: 12px;
                  text-align: center;
                  font-size: 16px;
                  font-weight: 500;
                  border-left: 4px solid #F49FB7;
                  box-shadow: 0px 2px 8px rgba(244, 159, 183, 0.2);
                }
        
                .appointment-details p {
                  margin: 8px 0;
                  color: #333;
                  font-size: 18px;
                }
        
                .button {
                  display: inline-block;
                  background: linear-gradient(135deg, #f49fb7, #d96090);
                  color: white;
                  padding: 14px 32px;
                  border-radius: 12px;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 16px;
                  box-shadow: 0px 4px 10px rgba(244, 159, 183, 0.4);
                  transition: all 0.3s ease-in-out;
                  margin-top: 24px;
                }
        
                .button:hover {
                  background: linear-gradient(135deg, #d96090, #b53d70);
                  box-shadow: 0px 6px 14px rgba(244, 159, 183, 0.5);
                  transform: scale(1.05);
                }
        
                .footer {
                  background: #222;
                  padding: 24px;
                  text-align: center;
                  color: white;
                  font-size: 14px;
                  border-radius: 0 0 16px 16px;
                  box-shadow: inset 0px 0px 12px rgba(255, 255, 255, 0.1);
                }
        
                .footer p {
                  margin: 0;
                  font-size: 14px;
                  opacity: 0.8;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">🏡 Your Mortgage Consultation is Confirmed</div>
                <div class="content">
                  <h2>Hi ${name}, we're looking forward to speaking with you!</h2>
                  <p>Your first mortgage consultation is scheduled. This is a great opportunity to discuss your options, ask questions, and get expert guidance.</p>
                  
                  <div class="appointment-details">
                    <p><strong>📅 Date:</strong> ${date}</p>
                    <p><strong>⏰ Time:</strong> ${time}</p>
                    <p><strong>📞 Format:</strong> Phone Call or Zoom (details will be sent separately)</p>
                  </div>
        
                  <h3>What to Expect in Your First Chat:</h3>
                  <ul style="text-align: left; padding: 0 20px; list-style: none;">
                    <li>✅ A friendly, no-obligation conversation about your mortgage needs.</li>
                    <li>✅ A chance to ask questions and explore different mortgage options.</li>
                    <li>✅ Clear next steps based on your situation.</li>
                  </ul>
        
                  <h3>How to Prepare:</h3>
                  <ul style="text-align: left; padding: 0 20px; list-style: none;">
                    <li>📌 Have a rough idea of your budget or income.</li>
                    <li>📌 Bring any questions you have about the process.</li>
                    <li>📌 If you have existing mortgage details, keep them handy.</li>
                  </ul>
        
                  <a
                    href="https://www.google.com/calendar/render?action=TEMPLATE&text=DSG+Mortgage+Call&dates=20250613T143000Z/20250613T150000Z&details=Initial+mortgage+consultation+with+DSG+Home+Finance.&location=Google+Meet&sf=true&output=xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button"
                  >
                    📆 Add to Calendar
                  </a>

                  <p>If you need to reschedule or have any urgent questions, simply reply to this email.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 DSG Home Finance. FCA Regulated Mortgage Advisors.</p>
                </div>
              </div>
            </body>
            </html>
          `;
        };

        const generateBrokerNotificationEmail = (
          name: string,
          email: string,
          phone: string,
          date: string,
          time: string,
          situation: string,
          otherInfo: string,
        ) => {
          return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Mortgage Consultation Request</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        
                body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #f3f4f6;
                  margin: 0;
                  padding: 0;
                  color: #222;
                }
        
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  padding: 32px;
                  border-radius: 16px;
                  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
                  overflow: hidden;
                  position: relative;
                }
        
                .header {
                  background: linear-gradient(135deg, #f59fb7, #d96090);
                  padding: 28px;
                  text-align: center;
                  color: white;
                  font-size: 26px;
                  font-weight: bold;
                  border-radius: 16px 16px 0 0;
                  box-shadow: inset 0px 0px 12px rgba(255, 255, 255, 0.3);
                }
        
                .content {
                  padding: 40px 20px;
                  text-align: center;
                  line-height: 1.6;
                }
        
                .content h2 {
                  font-size: 22px;
                  font-weight: 600;
                  color: #222;
                }
        
                .content p {
                  font-size: 16px;
                  color: #555;
                  margin: 10px 0;
                }
        
                .details {
                  margin-top: 24px;
                  padding: 20px;
                  background: rgba(244, 159, 183, 0.1);
                  border-radius: 12px;
                  text-align: center;
                  font-size: 16px;
                  font-weight: 500;
                  border-left: 4px solid #F49FB7;
                  box-shadow: 0px 2px 8px rgba(244, 159, 183, 0.2);
                }
        
                .details p {
                  margin: 8px 0;
                  color: #333;
                  font-size: 18px;
                }
        
                .footer {
                  background: #222;
                  padding: 24px;
                  text-align: center;
                  color: white;
                  font-size: 14px;
                  border-radius: 0 0 16px 16px;
                  box-shadow: inset 0px 0px 12px rgba(255, 255, 255, 0.1);
                }
        
                .footer p {
                  margin: 0;
                  font-size: 14px;
                  opacity: 0.8;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">📅 New Mortgage Consultation Request</div>
                <div class="content">
                  <h2>Hi Davido!</h2>
                  <p>You have a new mortgage consultation request from a potential client. Here are the details:</p>
                  
                  <div class="details">
                    <p><strong>👤 Client Name:</strong> ${name}</p>
                    <p><strong>📧 Email:</strong> ${email}</p>
                    <p><strong>📞 Phone:</strong> ${phone}</p>
                    <p><strong>📅 Requested Appointment Date:</strong> ${date}</p>
                    <p><strong>⏰ Requested Time:</strong> ${time}</p>
                    <p><strong> Situation:</string> ${situation}</p>
                    <p><strong> Additional Information:</string> ${otherInfo}</p>
                  </div>
        
                  <p>Please review the details and get in touch with the client as soon as possible to confirm or reschedule the appointment.</p>
        
                  <p>If you need to reach out to the client or have any questions, you can contact them at the details provided above.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 DSG Home Finance. FCA Regulated Mortgage Advisors.</p>
                </div>
              </div>
            </body>
            </html>
          `;
        };

        try {
          // create contact (awaited so we can catch errors)
          const contact = await ctx.resend.contacts.create({
            email: input.email,
            firstName,
            lastName,
            unsubscribed: false,
            audienceId: "b16c7c9b-6902-462a-9cf7-0e5973792295",
          });
          console.log("contact created", contact);

          // IMPORTANT: `to` must be an array for batch.send
          const batchResponse = await ctx.resend.batch.send([
            {
              from: "DSG Home Finance <mortgageenquiries@updates.dsgmortgages.com>",
              to: [input.email],
              subject: "First step towards your Mortgage! - DSG HOME FINANCE",
              html: generateContactEmail(
                fullname,
                date.toLocaleDateString(),
                time
              ),
            },
            {
              from: "DSG Home Finance <mortgageenquiries@updates.dsgmortgages.com>",
              to: ["david@dsgmortgages.com"],
              subject: "New Contact Submission - DSG HOME FINANCE",
              html: generateBrokerNotificationEmail(
                fullname,
                email,
                phone,
                date.toLocaleDateString(),
                time,
                situation,
                other
              ),
            },
          ]);

          console.log("batch send response", batchResponse);
        } catch (err) {
          console.error("Resend error:", err);
        }

        return newContact;
      } catch (e) {
        console.error("Operation failed:", e);
        throw new Error("Failed to create contact and send confirmation");
      }
    }),
  getContactChart: protectedProcedure.query(async ({ ctx }) => {
    // Raw SQL query to group by year and month
    const responses: UserContact[] = await ctx.prisma.$queryRaw`
        SELECT
          DATE_TRUNC('month', "createdAt") AS month,
          COUNT(*) AS count
        FROM
          "UserContact"
        GROUP BY
          month
        ORDER BY
          month ASC;
      `;

    // Get current month and create array of next 12 months
    const currentDate = new Date();
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + i
      );
      return {
        month: date.toLocaleString("en-GB", { month: "long", year: "numeric" }),
        count: 0, // Default count
      };
    });

    // Fill in actual data where we have it
    responses.forEach((entry) => {
      const entryMonth = new Date(entry.month).toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
      });
      const monthIndex = months.findIndex((m) => m.month === entryMonth);
      if (monthIndex !== -1) {
        months[monthIndex].count = Number(entry.count);
      }
    });

    return months;
  }),
  setContacted: protectedProcedure
    .input(z.object({ contactId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const current = await ctx.prisma.userContact.findUnique({
        where: {
          id: input.contactId,
        },
      });

      return await ctx.prisma.userContact.update({
        where: {
          id: input.contactId,
        },
        data: {
          contacted: !current?.contacted,
        },
      });
    }),
  deleteContact: protectedProcedure
    .input(z.object({ contactId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // First check if the contact exists
        const contactExists = await ctx.prisma.userContact.findUnique({
          where: { id: input.contactId },
          select: { id: true },
        });

        if (!contactExists) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Contact not found",
          });
        }

        const result = await ctx.prisma.userContact.delete({
          where: { id: input.contactId },
        });

        // Explicitly return a JSON-serializable object
        return {
          success: true,
          deletedId: result.id,
        };
      } catch (error) {
        console.error("Server-side deletion error:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Database error during deletion",
            cause: error,
          });
        }

        throw error;
      }
    }),
  editContact: protectedProcedure
    .input(
      z.object({
        contactId: z.string(),
        fullname: z.string(),
        email: z.string().email(),
        phone: z.string(),
        situation: z.string(),
        other: z.string(),
        updatedAt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.userContact.update({
        where: { id: input.contactId },
        data: {
          fullname: input.fullname,
          email: input.email,
          phone: input.phone,
          situation: input.situation,
          other: input.other,
          updatedAt: new Date(input.updatedAt),
        },
      });
    }),
  getContact: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.userContact.findUnique({
        where: { id: input.id },
      });
    }),
});
