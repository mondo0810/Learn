namespace TestCSharp_DoVanThi
{
    public class Menu
    {
        private ContactManager contactManager = new ContactManager();
        public void Run()
        {
            int choice;
            do
            {
                Console.WriteLine("Contact Manager Menu:");
                Console.WriteLine("1. Add new contact");
                Console.WriteLine("2. Find a contact by name");
                Console.WriteLine("3. Display contacts");
                Console.WriteLine("4. Exit");

                try
                {
                    Console.Write("Enter your choice: ");
                    choice = int.Parse(Console.ReadLine());

                    switch (choice)
                    {
                        case 1:
                            contactManager.AddContact();
                            break;
                        case 2:
                            contactManager.FindContact();
                            break;
                        case 3:
                            contactManager.DisplayContacts();
                            break;
                        case 4:
                            Console.WriteLine("Exiting Contact Manager");
                            break;
                        default:
                            Console.WriteLine("Invalid choice. Please try again.");
                            break;
                    }
                }
                catch (FormatException)
                {
                    Console.WriteLine("Invalid input. Please enter a valid number.");
                    choice = 0;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                    choice = 0;
                }

            } while (choice != 4);
        }
    }
}