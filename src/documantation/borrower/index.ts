import { responses } from "../responses";

const create_borrow = {
  tags: ["Borrow"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: "Create a new borrow",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            full_name: {
              type: "string",
              description: "Full name of the borrower",
              example: "John Doe",
            },
            national_id: {
              type: "string",
              description: "National ID of the borrower",
              example: "1234567890",
            },
            email: {
              type: "string",
              description: "Email address of the borrower",
              format: "email",
              example: "johndoe@example.com",
            },
            phone_number: {
              type: "string",
              description: "Phone number of the borrower",
              example: "+1234567890",
            },
            residance_address: {
              type: "string",
              description: "Residential address of the borrower",
              example: "123 Main Street, City, Country",
            },
            assurer_name: {
              type: "string",
              description: "Name of the assurer",
              example: "Jane Smith",
            },
            assurer_contact: {
              type: "string",
              description: "Contact information of the assurer",
              example: "+9876543210",
            },
            itemId: {
              type: "string",
              description: "ID of the item being borrowed",
              format: "uuid",
            },
          },
          required: ["full_name", "national_id", "email", "itemId"],
        },
      },
    },
  },
  consumes: ["application/json"],
  responses,
};

const read_borrows = {
  all: {
    tags: ["Borrow"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "List all borrows",
    description: "Retrieve a list of all borrowed items",
    responses,
  },
  single: {
    tags: ["Borrow"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Get a single borrow",
    description: "Retrieve details of a specific borrowed item",
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

const update_borrow = {
  tags: ["Borrow"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: "Update a borrow",
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
      "application/json": {
        schema: {
          type: "object",
          properties: {
            full_name: {
              type: "string",
              description: "Full name of the borrower",
              example: "John Doe",
            },
            national_id: {
              type: "string",
              description: "National ID of the borrower",
              example: "1234567890",
            },
            email: {
              type: "string",
              description: "Email address of the borrower",
              format: "email",
              example: "johndoe@example.com",
            },
            phone_number: {
              type: "string",
              description: "Phone number of the borrower",
              example: "+1234567890",
            },
            residance_address: {
              type: "string",
              description: "Residential address of the borrower",
              example: "123 Main Street, City, Country",
            },
            assurer_name: {
              type: "string",
              description: "Name of the assurer",
              example: "Jane Smith",
            },
            assurer_contact: {
              type: "string",
              description: "Contact information of the assurer",
              example: "+9876543210",
            },
            itemId: {
              type: "string",
              description: "ID of the item being borrowed",
              format: "uuid",
            },
          },
        },
      },
    },
  },
  responses,
};

const delete_borrow = {
  tags: ["Borrow"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: "Delete a borrow",
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

export const borrows = {
  "/api/v1/borrows": {
    post: create_borrow,
    get: read_borrows["all"],
  },
  "/api/v1/borrows/{id}": {
    get: read_borrows["single"],
    patch: update_borrow,
    delete: delete_borrow,
  },
};
