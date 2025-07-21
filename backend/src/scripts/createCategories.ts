import dataSource from "@config/database"
import { Category } from "@entities/Category"


export const categories = [
  {
    name: "Groceries",
    description: "Expenses related to food and household items.",
  },
  {
    name: "Utilities",
    description: "Expenses related to utilities like electricity, water, and gas."
  },
  {
    name: "Shopping",
    description: "Expenses related to clothing, electronics, and other shopping activities."
  },
  {
    name: "Transport",
    description: "Expenses related to public transport, fuel, and vehicle maintenance."
  },
  {
    name: "Travel",
    description: "Expenses related to travel, including flights, hotels, and activities."
  },
  {
    name: "Health",
    description: "Expenses related to medical and health services."
  },
  {
    name: "Entertainment",
    description: "Expenses related to movies, concerts, and other entertainment activities."
  },
  {
    name: "Gifts",
    description: "Expenses related to giving gifts for occasions like birthdays and holidays."
  },
  {
    name: "Education",
    description: "Expenses related to tuition, books, and other educational materials."
  },
  {
    name: "Miscellaneous",
    description: "Any other expenses that do not fit into the above categories."
  }
]

const createCategories = async (): Promise<void> => {
  try {
    await dataSource.initialize();
    console.log("Established database connection");

    const categoryRepository = dataSource.getRepository(Category);
    const savedCategories = await categoryRepository.find();
    console.log(savedCategories.map((category) => category.name));
  } catch (error) {
    console.error("Error creating categories: ", error)
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

if (require.main === module) {
  createCategories();
}