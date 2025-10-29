export const Index = () => {
  return (
    <div className="p-6" id="aboutUs">
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">What we are ?</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Smart School is a modern{" "}
          <b>Student Record Management System (SRMS) </b>
          built to simplify school operations. It connects administrators,
          teachers, parents, and students on one centralized platform.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          From managing enrollment, attendance, and academics to handling
          finance, library, and behavioral records — Smart School ensures smooth
          digital management for every aspect of school life.
        </p>
      </div>

      <div className="flex justify-between gap-7 mt-5">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-600 text-lg">
            To empower schools with efficient, scalable, and secure digital
            tools that streamline daily operations and enhance learning
            experiences.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Our Vision
          </h3>
          <p className="text-gray-600 text-lg">
            To make every school smarter by providing a unified management
            system that bridges communication among all stakeholders.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Our Values
          </h3>
          <p className="text-gray-600 text-lg">
            Simplicity, security, and scalability — we build technology that
            grows with your school.
          </p>
        </div>
      </div>
    </div>
  );
};
