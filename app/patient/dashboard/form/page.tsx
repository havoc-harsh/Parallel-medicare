"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface MedicalProfile {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  vaccinations: string[];
  lastCheckup: string;
  favoriteDoctors: { name: string; specialty: string }[];
}

export default function MedicalProfilePage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      
      // Basic validation
      const bloodType = formData.get("bloodType")?.toString().trim();
      if (!bloodType) {
        throw new Error("Blood type is required.");
      }

      // Process form data
      const newProfile: MedicalProfile = {
        bloodType: bloodType,
        allergies: getTrimmedArray(formData.get("allergies")),
        medications: getTrimmedArray(formData.get("medications")),
        conditions: getTrimmedArray(formData.get("conditions")),
        vaccinations: getTrimmedArray(formData.get("vaccinations")),
        lastCheckup: formData.get("lastCheckup")?.toString() || "",
        favoriteDoctors: [],
      };

      // Simulate API call
      await fetch("/api/medical-profile", {
        method: "POST",
        body: JSON.stringify(newProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/patient/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTrimmedArray = (value: FormDataEntryValue | null): string[] => {
    return (value?.toString() || "")
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2f7] to-[#d0d8e5] text-gray-900 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Fill Out Your Medical Profile</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields remain the same as before */}
          {/* Blood Type */}
          <div>
            <label
              htmlFor="bloodType"
              className="block text-sm font-medium text-gray-700"
            >
              Blood Type
            </label>
            <input
              type="text"
              name="bloodType"
              id="bloodType"
              required
              placeholder="e.g., A+, O-, B-"
              title="Enter your blood type"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Allergies */}
          <div>
            <label
              htmlFor="allergies"
              className="block text-sm font-medium text-gray-700"
            >
              Allergies (comma separated)
            </label>
            <input
              type="text"
              name="allergies"
              id="allergies"
              required
              placeholder="e.g., Peanuts, Dust"
              title="List your allergies separated by commas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Medications */}
          <div>
            <label
              htmlFor="medications"
              className="block text-sm font-medium text-gray-700"
            >
              Medications (comma separated)
            </label>
            <input
              type="text"
              name="medications"
              id="medications"
              required
              placeholder="e.g., Paracetamol, Ibuprofen"
              title="Enter your medications separated by commas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Conditions */}
          <div>
            <label
              htmlFor="conditions"
              className="block text-sm font-medium text-gray-700"
            >
              Conditions (comma separated)
            </label>
            <input
              type="text"
              name="conditions"
              id="conditions"
              required
              placeholder="e.g., Diabetes, Hypertension"
              title="List your medical conditions separated by commas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Vaccinations */}
          <div>
            <label
              htmlFor="vaccinations"
              className="block text-sm font-medium text-gray-700"
            >
              Vaccinations (comma separated)
            </label>
            <input
              type="text"
              name="vaccinations"
              id="vaccinations"
              required
              placeholder="e.g., COVID-19, Flu Shot"
              title="Enter your vaccinations separated by commas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Last Checkup */}
          <div>
            <label
              htmlFor="lastCheckup"
              className="block text-sm font-medium text-gray-700"
            >
              Last Checkup Date
            </label>
            <input
              type="date"
              name="lastCheckup"
              id="lastCheckup"
              required
              title="Select your last checkup date"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
