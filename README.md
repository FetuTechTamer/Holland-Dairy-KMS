# Holland Dairy Knowledge Management System (KMS)

A comprehensive, state-of-the-art Knowledge Management System built to support over 4,000 Holland Dairy farmers and staff based in Bishoftu. The Hub delivers role-specific insights, operational tools, and learning materials to streamline dairy farm operations, production, and quality control.

## 🌟 Key Features

*   **Role-Based Access & Dashboards**: Dedicated views and capabilities tailored for **Farmers**, **Staff**, and **Administrators**.
*   **Bilingual Support**: Full application-wide support for **English** and **Amharic** to ensure accessibility for all users.
*   **Ethiopian Calendar Utility**: Robust integration of Ethiopian dates for tasks, scheduling, and local reporting relevance.
*   **Farm Management Tools**: Practical, interactive calculators to assist farmers with daily operational metrics.
*   **Knowledge & Resource Hub**: 
    *   Interactive video tutorials and reading materials.
    *   Detailed **Product** and **Resource** navigation pages.
*   **Staff Collaboration Module**:
    *   **Chat Dashboard**: A dedicated feed (`KnowledgeShareFeed`) for internal staff discussions.
    *   **Legacy Stories**: A platform for staff to recount and share foundational company experiences.
    *   **Customer Insights**: Aggregated feedback and insights available in the staff knowledge base.
*   **Theme-Aware UI**: Full light and dark mode support for better viewing experiences across environments.

## 🛠️ Technology Stack

This project is built using modern web development standards and a robust frontend framework:

*   [**Next.js**](https://nextjs.org/) (App Router, React 19)
*   [**Tailwind CSS**](https://tailwindcss.com/) for utility-first styling
*   [**Framer Motion**](https://www.framer.com/motion/) for dynamic UI interactions and animations
*   [**TypeScript**](https://www.typescriptlang.org/) for static type-checking
*   [**Lucide React**](https://lucide.dev/) & [**React Icons**](https://react-icons.github.io/react-icons/) for iconography

## 🚀 Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/your-org/holland-dairy-hub.git
    cd holland-dairy-hub
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  **Open the application**:
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## 📂 Project Structure Overview

*   `src/app/` - Next.js App Router endpoints and page layouts.
*   `src/components/` - Reusable React components (UI elements, Layouts, Dashboards).
*   `src/context/` & `src/providers/` - React contexts and state management (e.g., Theme, Auth, Language).
*   `src/lib/` - Shared utilities like Ethiopian calendar logic, formatting, and dummy data structures.
*   `public/` - Static assets, images, and brand elements.

## 🤝 Contribution Guidelines

To contribute to this project:
1. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request.

Ensure all your code changes are formatted properly and do not break existing TypeScript types or linters (`npm run lint`).
