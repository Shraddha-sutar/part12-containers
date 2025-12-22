const todoSchema = new mongoose.Schema(
  {
    text: {
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
