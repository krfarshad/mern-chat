// seed.ts

import mongoose, { ConnectOptions, Types } from "mongoose";
import { faker } from "@faker-js/faker";
import { User } from "../models/user-model";
import { Chat } from "../models/chat-model";
import { Message } from "../models/message-model";

const MONGO_URI = "mongodb://localhost:27017/mern-chat";
interface UserType {
  _id: Types.ObjectId;
  username: string;
  displayName: string;
  bio: string;
  password: string;
  email: string;
  avatar: string;
}

// Seed function to add mock data to MongoDB
async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {} as ConnectOptions);
    console.log("Connected to MongoDB");

    // Clear existing collections
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});

    // Step 1: Generate mock users
    const users: UserType[] = [];
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        username: faker.internet.userName(),
        displayName: faker.person.fullName(),
        bio: faker.lorem.sentence(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
      });
      users.push(user as any);
    }

    // Step 2: Generate mock chats (private and group)
    for (let i = 0; i < 5; i++) {
      const isGroupChat = faker.datatype.boolean();
      const participants = isGroupChat
        ? users.slice(0, faker.number.int({ min: 3, max: 5 }))
        : [users[i], users[(i + 1) % users.length]];

      const chat = await Chat.create({
        type: isGroupChat ? "group" : "private",
        participants: participants.map((user) => user._id),
        name: isGroupChat ? faker.company.name() : undefined,
        admin: isGroupChat ? participants[0]._id : undefined,
        avatar: isGroupChat ? faker.image.avatar() : undefined,
        createdAt: faker.date.past(),
      });

      // Step 3: Generate messages for each chat
      const messages: Types.ObjectId[] = [];
      for (let j = 0; j < 10; j++) {
        const message = await Message.create({
          chat: chat._id,
          sender:
            participants[
              faker.number.int({ min: 0, max: participants.length - 1 })
            ]._id,
          text: faker.lorem.sentence(),
          createdAt: faker.date.recent(),
        });

        messages.push(message._id);
        chat.lastMessage = message._id;
      }

      await chat.save();
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();
