user = User.create(name: 'test', password: 'abc123', password_confirmation: 'abc123')
Task.where(user_id: nil).update(user_id: user.id)
