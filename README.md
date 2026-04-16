# Holland Dairy Knowledge Management System (KMS)

A comprehensive, state-of-the-art Knowledge Management System built to support over 4,000 Holland Dairy farmers and staff based in Bishoftu. The Hub delivers role-specific insights, operational tools, and learning materials to streamline dairy farm operations, production, and quality control.

## 🌟 Key Features

*   **Role-Based Access Control (RBAC)**:
    *   **Staff Sub-roles**: Specialized dashboards for **Production**, **Quality**, and **Logistics** staff with granular category filtering in the Knowledge Base.
    *   **Farmer & Admin Views**: Dedicated environments for dairy management and system oversight.
*   **Advanced Communication Suite**:
    *   **Staff Connect**: High-fidelity departmental chat rooms featuring a desktop 3-column layout, mobile drawers, pinned room announcements, and active member lists.
    *   **Unified Chat System**: A persistent 1-to-1 messaging platform allowing staff to communicate directly with Admin and Farmers, complete with unread notification tracking.
*   **Bilingual Support**: Full application-wide support for **English** and **Amharic** with a centralized translation architecture.
*   **Ethiopian Calendar Utility**: Robust integration of Ethiopian dates for milk delivery logs, tasks, and scheduling.
*   **Modern Knowledge Hub**:
    *   Interactive video tutorials and role-specific reading materials.
    *   Dynamic **Product** and **Resource** navigation pages with deep-linking support.
*   **Premium Responsive UI**: 
    *   Theme-aware (Light/Dark mode) glassmorphism design.
    *   Fully responsive components including drawer-based navigations for complex chat and dashboard layouts.

## 🛠️ Technology Stack

This project is built using modern web development standards:

*   [**Next.js**](https://nextjs.org/) (App Router, React 19)
*   [**Tailwind CSS**](https://tailwindcss.com/) with custom Glassmorphism utilities
*   [**Framer Motion**](https://www.framer.com/motion/) for fluid UI transitions
*   [**TypeScript**](https://www.typescriptlang.org/) for type safety
*   [**Lucide React**](https://lucide.dev/) for high-quality iconography
*   [**Context API**](https://react.dev/reference/react/useContext) for global state (Auth, Lang, Chat, Comm)

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/FetuTechTamer/Holland-Dairy-KMS.git
    cd Holland-Dairy-KMS
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Login & Test**:
    Use the **"Quick Demo"** buttons on the [Login Page](http://localhost:3000/login) to instantly access the system as:
    - **Production Staff** (Bishoftu Facility)
    - **Quality Staff** (Laboratory)
    - **Logistics Staff** (Supply Chain)
    - **Farmer** (Milk Supplier)

## 📂 Project Structure Overview

*   `src/app/` - App Router pages and layouts.
*   `src/components/` - Dashboard modules, Chat systems, and UI components.
*   `src/context/` - Global state providers (Communication, Chat, Auth).
*   `src/lib/` - Shared utilities, Ethiopian calendar, translations, and mock data.
*   `public/` - Static assets and branding.

## 🤝 Contribution Guidelines

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request.

Ensure code adheres to TypeScript types and linting rules (`npm run lint`).
