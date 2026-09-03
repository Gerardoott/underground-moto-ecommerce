import { listCategories } from "@lib/data/categories"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-line w-full bg-black">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start xsmall:items-center justify-between py-12 border-b border-line">
          <LocalizedClientLink
            href="/"
            className="font-display text-bone hover:text-violet uppercase tracking-wide"
          >
            Tekko
          </LocalizedClientLink>

          {productCategories && productCategories.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
              {productCategories
                .filter((c) => !c.parent_category)
                .slice(0, 10)
                .map((c) => (
                  <LocalizedClientLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    className="text-bone-muted hover:text-bone transition-colors duration-150 uppercase"
                    data-testid="category-link"
                  >
                    {c.name}
                  </LocalizedClientLink>
                ))}
            </div>
          )}
        </div>
        <div className="flex w-full py-6 justify-between text-bone-muted">
          <Text className="font-mono text-xs">
            © {new Date().getFullYear()} Tekko. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}