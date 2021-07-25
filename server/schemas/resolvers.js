const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    self: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Wrong Email");
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Wrong Password");
      }

      const signedToken = signToken(user);
      return { signedToken, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const userWithBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );

        return userWithBook;
      }

      throw new AuthenticationError("Not logged in");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const userWithoutBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return userWithoutBook;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
