import React from "react";

const TutorProfile = ({ data }) => {
    const {
        name,
        imageUrl,
        email,
        phone,
        address,
        city,
        state,
        country,
        education,
        certifications,
        students,
        inquiries,
        reviews,
        specialty,
        tutorCourses,
        type,
    } = data;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-20 h-20 rounded-full border-4 border-white"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{name}</h1>
                            <p className="text-sm">{email}</p>
                            <p className="text-sm">{phone}</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Personal Info */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium">Address</p>
                                <p className="text-gray-600">{address}</p>
                            </div>
                            <div>
                                <p className="font-medium">City</p>
                                <p className="text-gray-600">{city}</p>
                            </div>
                            <div>
                                <p className="font-medium">State</p>
                                <p className="text-gray-600">{state}</p>
                            </div>
                            <div>
                                <p className="font-medium">Country</p>
                                <p className="text-gray-600">{country}</p>
                            </div>
                        </div>
                    </section>

                    {/* Education */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                        {education?.map((edu, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                                <img
                                    src={edu.document}
                                    alt={edu.level}
                                    className="w-20 h-20 rounded-full border-4 border-white"
                                />

                                <p className="font-medium">{edu.level}</p>
                                <p className="text-gray-600">
                                    {edu.university}, {edu.location} ({edu.year})
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* Certifications */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                        {certifications?.map((cert, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                                <img
                                    src={cert.upload}
                                    alt={cert.name}
                                    className="w-20 h-20 rounded-full border-4 border-white"
                                />
                                <p className="font-medium">{cert.name}</p>
                                <p className="text-gray-600">
                                    {cert.institute} ({cert.year})
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* Students */}
                    {/* <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Students</h2>
                        {students?.data.datalist.map((student, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                                <p className="font-medium">Date: {student.date}</p>
                                <p className="text-gray-600">
                                    Time: {student.timeFrom} - {student.timeTo}
                                </p>
                            </div>
                        ))}
                    </section> */}

                    {/* Inquiries */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Inquiries</h2>
                        {inquiries?.map((inquiry, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                                <p className="font-medium">Course: {inquiry.courseName}</p>
                                <p className="text-gray-600">Status: {inquiry.status}</p>
                            </div>
                        ))}
                    </section>

                    {/* Reviews */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
                        {reviews?.map((review, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                                <p className="font-medium">{review.userName}</p>
                                <p className="text-gray-600">Rating: {review.rating}</p>
                                <p className="text-gray-600">Comment: {review.comment}</p>
                            </div>
                        ))}
                    </section>

                    {/* Specialties */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Specialties</h2>
                        <div className="flex flex-wrap gap-2">
                            {specialty?.map((spec, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Courses */}
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
                        {tutorCourses?.map((course, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                                <p className="font-medium">{course.course}</p>
                                <p className="text-gray-600">Fee: ₹{course.fee}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TutorProfile;
