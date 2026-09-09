import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import { BigNumberValue, CustomerDTO, OrderDTO } from "@medusajs/framework/types"

type OrderPlacedEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  email_banner?: {
    body: string
    title: string
    url: string
  }
}

function OrderPlacedEmailComponent({ order, email_banner }: OrderPlacedEmailProps) {
  const shouldDisplayBanner = email_banner && "title" in email_banner

  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: order.currency_code,
  })

  const formatPrice = (price: BigNumberValue) => {
    if (typeof price === "number") {
      return formatter.format(price)
    }

    if (typeof price === "string") {
      return formatter.format(parseFloat(price))
    }

    return price?.toString() || ""
  }

  return (
    <Tailwind>
      <Html className="font-sans" style={{ backgroundColor: "#0A0A0A" }}>
        <Head />
        <Preview>Gracias por tu compra en Tekko</Preview>
        <Body
          style={{ backgroundColor: "#0A0A0A", color: "#F2F0EB" }}
          className="my-10 mx-auto w-full max-w-2xl"
        >
          {/* Header */}
          <Section
            style={{ backgroundColor: "#0A0A0A", borderBottom: "1px solid #2A2A2A" }}
            className="px-6 py-6"
          >
            <Text
              style={{
                color: "#F2F0EB",
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "2px",
                margin: 0,
              }}
            >
              TEKKO
            </Text>
          </Section>

          {/* Thank You Message */}
          <Container className="p-6">
            <Heading
              style={{ color: "#F2F0EB" }}
              className="text-2xl font-bold text-center"
            >
              ¡Gracias por tu pedido, {order.customer?.first_name || order.shipping_address?.first_name}!
            </Heading>
            <Text style={{ color: "#8C8880" }} className="text-center mt-2">
              Estamos preparando tu pedido y te avisaremos cuando sea enviado.
            </Text>
          </Container>

          {/* Promotional Banner */}
          {shouldDisplayBanner && (
            <Container
              className="mb-4 p-7"
              style={{ backgroundColor: "#9B4DFF" }}
            >
              <Section>
                <Row>
                  <Column align="left">
                    <Heading style={{ color: "#0A0A0A" }} className="text-xl font-semibold">
                      {email_banner.title}
                    </Heading>
                    <Text style={{ color: "#0A0A0A" }} className="mt-2">
                      {email_banner.body}
                    </Text>
                  </Column>
                  <Column align="right">
                    <Link
                      href={email_banner.url}
                      style={{ color: "#0A0A0A" }}
                      className="font-semibold px-2 underline"
                    >
                      Ver más
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Container>
          )}

          {/* Order Items */}
          <Container className="px-6">
            <Heading style={{ color: "#F2F0EB" }} className="text-xl font-semibold mb-4">
              Tus productos
            </Heading>
            <Row>
              <Column>
                <Text style={{ color: "#8C8880" }} className="text-sm m-0 my-2">
                  Pedido #{order.display_id}
                </Text>
              </Column>
            </Row>
            {order.items?.map((item) => (
              <Section
                key={item.id}
                style={{ borderBottom: "1px solid #2A2A2A" }}
                className="py-4"
              >
                <Row>
                  <Column className="w-1/3">
                    <Img
                      src={item.thumbnail ?? ""}
                      alt={item.product_title ?? ""}
                      width="100%"
                    />
                  </Column>
                  <Column className="w-2/3 pl-4">
                    <Text style={{ color: "#F2F0EB" }} className="text-lg font-semibold">
                      {item.product_title}
                    </Text>
                    <Text style={{ color: "#8C8880" }}>{item.variant_title}</Text>
                    <Text style={{ color: "#F2F0EB" }} className="mt-2 font-bold">
                      {formatPrice(item.total)}
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}

            {/* Order Summary */}
            <Section className="mt-8">
              <Heading style={{ color: "#F2F0EB" }} className="text-xl font-semibold mb-4">
                Resumen del pedido
              </Heading>
              <Row>
                <Column className="w-1/2">
                  <Text style={{ color: "#8C8880" }} className="m-0">Subtotal</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text style={{ color: "#8C8880" }} className="m-0">
                    {formatPrice(order.item_total)}
                  </Text>
                </Column>
              </Row>
              {order.shipping_methods?.map((method) => (
                <Row key={method.id}>
                  <Column className="w-1/2">
                    <Text style={{ color: "#8C8880" }} className="m-0">{method.name}</Text>
                  </Column>
                  <Column className="w-1/2 text-right">
                    <Text style={{ color: "#8C8880" }} className="m-0">{formatPrice(method.total)}</Text>
                  </Column>
                </Row>
              ))}
              <Row>
                <Column className="w-1/2">
                  <Text style={{ color: "#8C8880" }} className="m-0">Impuestos</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text style={{ color: "#8C8880" }} className="m-0">{formatPrice(order.tax_total || 0)}</Text>
                </Column>
              </Row>
              <Row style={{ borderTop: "1px solid #2A2A2A" }} className="mt-4">
                <Column className="w-1/2">
                  <Text style={{ color: "#F2F0EB" }} className="font-bold">Total</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text style={{ color: "#9B4DFF" }} className="font-bold">{formatPrice(order.total)}</Text>
                </Column>
              </Row>
            </Section>
          </Container>

          {/* Footer */}
          <Section style={{ borderTop: "1px solid #2A2A2A" }} className="p-6 mt-10">
            <Text style={{ color: "#8C8880" }} className="text-center text-sm">
              ¿Alguna duda? Responde a este correo o escríbenos a soporte@gettekko.com.
            </Text>
            <Text style={{ color: "#8C8880" }} className="text-center text-sm">
              N.° de pedido: {order.id}
            </Text>
            <Text style={{ color: "#8C8880" }} className="text-center text-xs mt-4">
              © {new Date().getFullYear()} Tekko. Todos los derechos reservados.
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => (
  <OrderPlacedEmailComponent {...props} />
)