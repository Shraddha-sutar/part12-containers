const todoSchema = new mongoose.Schema(
  {
    text: {
      title: { type: String, required: false },
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)
