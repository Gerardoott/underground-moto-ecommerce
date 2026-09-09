import { MetadataRoute } from "next"
import { listRegions } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://gettekko.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const regions = await listRegions()
  const countryCodes =
    regions
      ?.map((r) => r.countries?.map((c) => c.iso_2))
      .flat()
      .filter(Boolean) as string[]

  if (!countryCodes || countryCodes.length === 0) {
    return []
  }

  const entries: MetadataRoute.Sitemap = []

  for (const countryCode of countryCodes) {
    // Home
    entries.push({
      url: `${SITE_URL}/${countryCode}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    })

    // Store (catálogo completo)
    entries.push({
      url: `${SITE_URL}/${countryCode}/store`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    })

    // Productos
    try {
      const { response } = await listProducts({
        countryCode,
        queryParams: { limit: 200, fields: "handle,updated_at" },
      })

      response.products.forEach((product) => {
        if (product.handle) {
          entries.push({
            url: `${SITE_URL}/${countryCode}/products/${product.handle}`,
            lastModified: product.updated_at
              ? new Date(product.updated_at)
              : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          })
        }
      })
    } catch (error) {
      console.error(`Error al listar productos para el sitemap (${countryCode}):`, error)
    }

    // Categorías
    try {
      const categories = await listCategories()

      categories?.forEach((category: any) => {
        if (category.handle) {
          entries.push({
            url: `${SITE_URL}/${countryCode}/categories/${category.handle}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          })
        }
      })
    } catch (error) {
      console.error(`Error al listar categorías para el sitemap (${countryCode}):`, error)
    }

    // Colecciones
    try {
      const { collections } = await listCollections({})

      collections?.forEach((collection) => {
        if (collection.handle) {
          entries.push({
            url: `${SITE_URL}/${countryCode}/collections/${collection.handle}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          })
        }
      })
    } catch (error) {
      console.error(`Error al listar colecciones para el sitemap (${countryCode}):`, error)
    }
  }

  return entries
}