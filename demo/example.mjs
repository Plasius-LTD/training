import { createTrainingInstitution, packageDescriptor } from "../dist/index.js";

const institution = createTrainingInstitution({
  institutionId: "academy-demo",
  type: "academy",
  track: "hybrid",
  eligible: true,
});

console.log(packageDescriptor);
console.log(institution);
