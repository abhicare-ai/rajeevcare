import React from "react";
import {
  Html,
  Head,
  Font,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface PrescriptionEmailProps {
  link: string;
  patientName: string;
}

export default function SendToDrRajeev({
  link,
  patientName,
}: PrescriptionEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Patient Prescription</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Section>
        <Row>
          <Heading as="h2">Dear Dr. Rajeev Kumar,</Heading>
        </Row>

        <Row>
          <Text>
            A new prescription has been generated for Case History ID{" "}
            <strong>{patientName}</strong>.
          </Text>
        </Row>

        <Row>
          <Text>
            Please click the button below to view the full prescription and
            treatment details.
          </Text>
        </Row>

        <Row>
          <Button
            href={link}
            style={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            View Prescription
          </Button>
        </Row>

        <Row>
          <Text>
            If you are not expecting this email, you may safely ignore it.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
