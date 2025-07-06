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
  patientId: string;
  link: string;
  patienName: string;
  to: string;
}

export default function PatientEmail({
  patientId,
  link,
  patienName,
  to,
}: PrescriptionEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Prescription is Ready</title>
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
          <Heading as="h2" style={{ textTransform: "uppercase" }}>
            Dear {patienName},
          </Heading>
        </Row>

        <Row>
          <Text>
            Your prescription for Case ID <strong>{patientId}</strong> has been
            generated successfully.
          </Text>
        </Row>

        <Row>
          <Text>
            Please click the button below to view your full prescription and
            treatment details.
          </Text>
        </Row>

        <Row>
          <Button
            href={link}
            style={{
              backgroundColor: "#28a745",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            View Your Prescription
          </Button>
        </Row>

        <Row>
          <Text>
            If you weren’t expecting this email, you can safely ignore it.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
