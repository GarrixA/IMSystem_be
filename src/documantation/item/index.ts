import { responses } from "../responses";

const createItem = {
  tags: ["Items"],
  security: [{ bearerAuth: [] }],
  summary: "Creating an item",
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          required: [
            "name",
            "title",
            "description",
            "categoryId",
            "status",
            "condition",
          ],
          properties: {
            name: {
              type: "string",
              description: "Items name",
              example: "Laptop",
            },
            title: {
              type: "string",
              description: "Items title",
              example: "High-End Laptop",
            },
            description: {
              type: "string",
              description: "Detailed description of the item",
              example: "A powerful laptop with 16GB RAM and 1TB SSD.",
            },
            status: {
              type: "string",
              description: "Availability status of the item",
              enum: ["available", "out_of_stock", "reserved"],
              example: "available",
            },
            condition: {
              type: "string",
              description: "Condition of the item",
              enum: ["new", "used", "good", "damaged"],
              example: "good",
            },
            images: {
              type: "array",
              items: {
                type: "file",
              },
              minItems: 4,
            },
            categoryId: {
              type: "string",
              description: "Items category ID",
              format: "uuid",
              example: "8efe453c-b779-453c-b96e-afe656eeebab",
            },
          },
        },
      },
    },
  },
  consumes: ["multipart/form-data"],
  responses,
};

const read_items = {
  all: {
    tags: ["Items"],
    security: [{ bearerAuth: [] }],
    summary: "Retrieve all items",
    description: "Get a list of all items",
    responses,
  },
  single: {
    tags: ["Items"],
    security: [{ bearerAuth: [] }],
    summary: "Retrieve a single item",
    description: "Fetch a single item by its ID",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses,
  },
};

const update_item = {
  tags: ["Items"],
  security: [{ bearerAuth: [] }],
  summary: "Update an item",
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          required: [
            "name",
            "title",
            "description",
            "categoryId",
            "status",
            "condition",
          ],
          properties: {
            name: {
              type: "string",
              description: "Items name",
              example: "Laptop",
            },
            title: {
              type: "string",
              description: "Items title",
              example: "Gaming Laptop",
            },
            description: {
              type: "string",
              description: "Detailed description of the item",
              example: "An upgraded gaming laptop with RTX 4090.",
            },
            status: {
              type: "string",
              description: "Availability status of the item",
              enum: ["available", "out_of_stock", "reserved"],
              example: "available",
            },
            condition: {
              type: "string",
              description: "Condition of the item",
              enum: ["new", "used", "good", "damaged"],
              example: "good",
            },
            images: {
              type: "array",
              items: {
                type: "file",
              },
              minItems: 4,
            },
            categoryId: {
              type: "string",
              description: "Items category ID",
              format: "uuid",
            },
          },
        },
      },
    },
  },
  responses,
};

const delete_item = {
  tags: ["Items"],
  security: [{ bearerAuth: [] }],
  summary: "Delete an item",
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  responses,
};

export const items = {
  "/api/v1/items": {
    post: createItem,
    get: read_items.all,
  },
  "/api/v1/items/{id}": {
    get: read_items.single,
    patch: update_item,
    delete: delete_item,
  },
};
