"use client";
import { useState, Fragment } from "react";
import { UserProfile } from "@clerk/nextjs";
import { Dialog, Transition } from "@headlessui/react";

const ProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center py-10">
    <UserProfile/>
    </div>
  );
};

export default ProfileModal;
