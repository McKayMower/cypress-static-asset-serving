import dynamic from "next/dynamic";

const Cesium = dynamic(() => import("@/components/cesium"), { ssr: false });

describe("test", () => {
  it("cesium", () => {
    cy.mount(
      <div className="flex h-full w-full">
        <Cesium testing>
        </Cesium>
      </div>
    )

    cy.wait(60000)
  })
})