import json

while 1:
    member_found = False

    # Load the existing members from the JSON file
    try:
        with open("Members.json", "r") as file:
            members = json.load(file)["Members"]
    except FileNotFoundError:
        members = []

    except json.JSONDecodeError:
        members = []

    Num_input = input(
        "Please Enter 1 to List The Members of the Team, 2 to Add a Member, 3 to Remove a Member, or 4 to Exit: "
    )
    if Num_input == "1":
        print("Members of the Team:")
        for member in members:
            print(
                f"""ID: {member['ID']}, Name: {member['Name']}, Role: {member['Role']}, IG: {member['Instagram']}, Year-of-Birth: {member['YoB']}, Timespan: {member['Timespan']}"""
            )
        print("End of Members List")
    elif Num_input == "2":
        # Add a new member
        # The ID will be unique for each member, so we can use it as a key to identify members
        # So The ID Should be Self-Incremented
        if members:
            last_member = members[-1]
            ID = int(last_member["ID"]) + 1
        else:
            ID = "1"

        Name = input("Enter the name of the new member: ")
        Role = input("Enter the role of the new member: ")

        Instagram = input("Enter the Instagram of the new member: ")
        YoB = input("Enter the year of birth of the new member: ")
        Timespan = input("Enter the timespan of the new member: ")

        # Create a new member dictionary
        new_member = {
            "ID": int(ID),
            "Name": Name,
            "Role": Role,
            "Image": "https://avatars.githubusercontent.com/u/103546648?v=4",
            "Instagram": f"https://www.instagram.com/{Instagram}",
            "YoB": YoB,
            "Timespan": Timespan,
        }

        # Append the new member to the list
        members.append(new_member)
        print(f"Member {Name} added successfully!")
    elif Num_input == "3":

        print("Members of the Team:")
        for member in members:
            print(
                f"""ID: {member['ID']}, Name: {member['Name']}, Role: {member['Role']}, IG: {member['Instagram']}, Year-of-Birth: {member['YoB']}, Timespan: {member['Timespan']}"""
            )
        print("End of Members List")

        # Remove a member
        ID = input("Enter the ID of the member to remove: ")
        member_found = False

        # Iterate through the members list to find the member with the given ID
        for member in members:
            if member["ID"] == int(ID):
                members.remove(member)
                print(f"Member with ID {ID} removed successfully!")
                member_found = True
                break

        if not member_found:
            print(f"No member found with ID {ID}.")
    elif Num_input == "4":
        print("Exiting the program.")
        break

    if Num_input == "3" and member_found:
        # Update The IDs of the Members after Removing a Member
        for i, member in enumerate(members):
            member["ID"] = i
        # Save the updated members list to the JSON file
        with open("Members.json", "w") as file:
            json.dump({"Members": members}, file, indent=4)
        print("Members list updated successfully!")
