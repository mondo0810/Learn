using System;
using System.Collections;

namespace TestCSharp_DoVanThi
{

    public class ContactManager
    {
        private Hashtable addressBook = new Hashtable();

        public void AddContact()
        {
            Console.WriteLine("Enter person's information:");

            try
            {
                Console.Write("Name: ");
                string name = Console.ReadLine();

                Console.Write("Phone: ");
                string phone = Console.ReadLine();

                Contact newContact = new Contact(name, phone);
                addressBook.Add(name, newContact);

                Console.WriteLine("Contact added successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        public void FindContact()
        {
            try
            {
                Console.Write("Enter name to find: ");
                string inputName = Console.ReadLine();

                bool found = false;

                foreach (var key in addressBook.Keys)
                {
                    string name = key.ToString();

                    if (name.IndexOf(inputName, StringComparison.OrdinalIgnoreCase) >= 0)
                    {
                        Contact contact = (Contact)addressBook[name];
                        Console.WriteLine($"Matching contact: {name}: {contact.PhoneNumber}");
                        found = true;
                    }
                }

                if (!found)
                {
                    Console.WriteLine("Not found");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

        public void DisplayContacts()
        {
            Console.WriteLine("Address Book");
            Console.WriteLine("Contact Name\tPhone number");

            try
            {
                foreach (DictionaryEntry entry in addressBook)
                {
                    Contact contact = (Contact)entry.Value;
                    Console.WriteLine($"{contact.Name}\t{contact.PhoneNumber}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }

    }
}
