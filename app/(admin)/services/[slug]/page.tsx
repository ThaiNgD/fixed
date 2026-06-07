import { BackButton } from "@/components/element/BackwardArrow";
import { Cell, Container, Row } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <>
      <BackButton className="mb-4 !p-0" title={slug} url="/parts" />
      <Accordion
        type="multiple"
        defaultValue={["part-information", "part-stats"]}
        className="p-4"
      >
        <AccordionItem key={"part-information"} value={"part-information"}>
          <AccordionTrigger
            // iconClassName="text-white"
            className="bg-gray-200 flex border-0 items-center p-2 rounded-[0px]"
          >
            <h2 className="px-4 text-lg font-bold">Service Information</h2>
          </AccordionTrigger>
          <AccordionContent className="bg-gray-100 p-2 rounded-[0px] rounded-b-lg">
            <Container className="p-4">
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Name">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Counts">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Description">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Type">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Unit">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Source">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Status">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Created At">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Created At">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Created By">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Updated At">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Updated By">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
            </Container>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="mt-4" key={"part-stats"} value={"part-stats"}>
          <AccordionTrigger
            // iconClassName="text-white"
            className="bg-gray-200 flex items-center p-2 rounded-[0px]"
          >
            <h2 className="px-4 text-lg font-bold">Service Statistics</h2>
          </AccordionTrigger>
          <AccordionContent className="bg-gray-100 p-2 rounded-[0px] rounded-b-lg">
            <Container className="p-4">
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
              <Row className="flex-row">
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
                <Cell className="bg-white " title="Service Details">
                  <p>This is the details page for a specific part.</p>
                </Cell>
              </Row>
            </Container>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default page;
