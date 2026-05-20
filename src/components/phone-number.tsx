type PhoneNumberProps = {
  value: string;
  clickable?: boolean;
};

function formatPhoneNumber(phone: string) {
  const normalized = phone.replace(/\D/g, "");

  if (normalized.startsWith("98") && normalized.length === 12) {
    return {
      href: `+${normalized}`,
      display: `+${normalized.slice(0, 2)} ${normalized.slice(
        2,
        5
      )} ${normalized.slice(5, 8)} ${normalized.slice(8)}`,
    };
  }

  if (normalized.startsWith("0") && normalized.length === 11) {
    return {
      href: phone,
      display: `${normalized.slice(0, 4)} ${normalized.slice(
        4,
        7
      )} ${normalized.slice(7)}`,
    };
  }

  return {
    href: phone,
    display: phone,
  };
}

export function PhoneNumber({ value, clickable = true }: PhoneNumberProps) {
  const phone = formatPhoneNumber(value);

  if (!clickable) {
    return <>{phone.display}</>;
  }

  return (
    <a href={`tel:${phone.href}`} dir="ltr">
      {phone.display}
    </a>
  );
}
