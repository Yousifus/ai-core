<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1lGINyf9SKinTl2GyvZI9SOFx0MVIjJzr

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# **Enterprise AI Token Usage Planner**

A sophisticated modeling tool that helps stakeholders make data-driven decisions about AI resource allocation across complex organizational structures. This multi-tab dashboard provides real-time calculations and advanced visualizations for comprehensive usage planning.

---

# **🎯 The Problem We're Solving**

AI Core face a critical challenge: **How do you fairly distribute AI tokens across departments while optimizing usage and controlling costs?**

**Current Pain Points:**
- Manual token allocation without data-driven insights
- "Due to usage limits I cannot" - users hit barriers unexpectedly  
- No visibility into department-wise consumption patterns
- Difficulty planning budgets and predicting usage spikes
- Lack of tools for scenario modeling and optimization

---

# 🚀 **The Solution**

This dashboard provides token usage modeling with:

## **🏢 Organizational Modeling**
- Dynamic department configuration
- Employee hierarchy modeling (managers, seniors, juniors)
- Geographic distribution across time zones
- User personas with different consumption patterns

## **📈 Advanced Analytics**
- Real-time usage projections
- Peak load prediction and planning
- Seasonal variation modeling
- Growth trajectory forecasting (12-36 months)

## **💰 Cost Optimization**
- Budget constraint scenarios
- Department-wise cost allocation
- ROI tracking and optimization
- Volume discount planning

## **🎨 Executive Dashboards**
- Cost burn rate gauges with budget alerts
- Department comparison heat maps
- Usage efficiency trends
- Interactive scenario planning tools

---

# **✨ Features**

- **Real-time Simulation:** Instantly see the impact of changes to various parameters on your projected AI costs.
- **Comprehensive Controls:** Adjust dozens of variables across several categories:
    - **Temporal Dynamics:** Model usage patterns based on time of day, peak hours, and more.
    - **User Behavior:** Account for different user habits like error retries and query iterations.
    - **Technical Parameters:** Fine-tune token counts, cache hit rates, and other technical details.
    - **Economic & Growth:** Set costs, budgets, and project future growth trajectories.
- **Organizational Modeling:** Define your company's structure by adding departments, specifying headcount (managers, senior, junior), and setting local timezones to accurately model global usage patterns.
- **Multi-Tab Dashboard:** View the data from different perspectives tailored to various stakeholders:
    - **Executive Tab:** High-level overview of annual/monthly costs, budget utilization, and cost distribution across departments.
    - **Operational Tab:** Insights into hourly usage patterns and a 12-month growth forecast.
    - **Analytical Tab:** A detailed waterfall chart breaking down how tokens are consumed, from base usage to final billed tokens after caching.
    - **Planning Tab:** A space for future scenario planning and risk assessment tools.
- **Advanced Visualizations:** The app uses a variety of charts to make complex data easy to understand:
    - **Cost Gauge:** See at a glance how projected costs stack up against your annual budget.
    - **Department Cost Chart:** A bar chart showing the breakdown of annual costs by department.
    - **Usage Heatmap:** A 24-hour visualization of token consumption, factoring in different department timezones.
    - **Growth Forecast:** A line chart projecting costs over the next 12 months based on your growth settings.
    - **Token Waterfall Chart:** Understand the entire lifecycle of a query's token cost, from generation to caching.

## **🚀 How to Use**

1.  **Use the Sidebar Controls:** The left sidebar contains all the adjustable parameters for the simulation.
    - Expand each section (e.g., "Temporal Dynamics", "User Behavior") to see the available sliders and inputs.
    - Hover over the `?` icon next to each slider for a detailed explanation of what it does.
    - Adjust the sliders to reflect your organization's expected behavior.
2.  **Model Your Organization:** In the "Organizational Model" section, you can change the number of managers, senior, and junior employees for each department and set their primary timezone.
3.  **Set Your Budget:** In the "Economic & Growth" section, input your total annual budget to see how your projections compare.
4.  **Explore the Dashboard Tabs:**
    - Click on the **Executive**, **Operational**, **Analytical**, and **Planning** tabs to view different visualizations of the simulated data.
    - All charts and figures will update in real-time as you change the parameters in the sidebar.

## **🛠️ Tech Stack**

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Charting Library:** Recharts
- **State Management:** React Hooks (`useState`, `useMemo`, `useCallback`)

## **📂 File Structure**

The project is organized into the following main directories:

-   `components/`: Contains all React components.
    -   `charts/`: Components specifically for data visualization (e.g., `CostGauge`, `UsageHeatmap`).
    -   `common/`: Reusable UI components like `Card`, `Slider`, and `Tooltip`.
    -   `Sidebar.tsx`: The main sidebar component with all simulation controls.
    -   `Dashboard.tsx`: The main dashboard component that handles tab switching.
-   `hooks/`: Custom React hooks.
    -   `useSimulation.ts`: The core logic for the entire cost and usage simulation.
-   `types.ts`: TypeScript type definitions used throughout the application.
-   `constants.ts`: Default parameters, initial department data, and other constants.
-   `App.tsx`: The main application component that ties everything together.
-   `index.tsx`: The entry point for the React application.
-   `index.html`: The main HTML file.

## 🎯 **Roadmap & Future Enhancements**

### **Phase 1: Core Platform** ✅
- [x] Basic department modeling
- [x] Usage simulation engine
- [x] Essential visualizations
- [x] Professional UI/UX

### **Phase 2: Advanced Analytics** 🚧
- [ ] Machine learning predictions
- [ ] Advanced correlation analysis  
- [ ] Custom report generation
- [ ] API integration capabilities

### **Phase 3: Enterprise Integration** 📋
- [ ] SSO authentication
- [ ] Role-based access control
- [ ] Export to enterprise systems
- [ ] Advanced collaboration features


