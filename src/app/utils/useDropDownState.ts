import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to manage the state and behavior of a dropdown component.
 * @param initialState - Initial state of the dropdown (open or closed).
 * @returns An object containing the dropdown state, a ref, and functions to toggle and close the dropdown.
 */
export const useDropdownState = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  // Ref to the dropdown element
  const ref = useRef<HTMLDivElement>(null);

  const closeDropdown = () => setIsOpen(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the dropdown element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add the event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Return the state, ref, and functions to manage the dropdown
  return { isOpen, closeDropdown, toggleDropdown, ref };
};
