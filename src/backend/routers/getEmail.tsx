import { render } from "@react-email/render";
import { ContactConfirmationEmail } from "./confirmationEmail";

export function generateContactEmail(name: string, date: string, time: string) {
  return render(
    <ContactConfirmationEmail name={name} date={date} time={time} />
  );
}
