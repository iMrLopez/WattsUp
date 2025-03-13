import axios from "axios";

const backendUrl = "http://localhost:8000";

// Send a new fact to the backend
export async function addFact(fact: string) {
  try {
    const response = await axios.post(
      `${backendUrl}/query/add_fact`,
      { fact },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding fact:", error);
    return null;
  }
}

// Query a rule with arguments
export async function queryRule(rule: string, args: string) {
  try {
    const response = await axios.get(`${backendUrl}/query`, {
      params: { rule, args },
    });
    return response.data;
  } catch (error) {
    console.error(`Error querying rule ${rule} with args ${args}:`, error);
    return null;
  }
}