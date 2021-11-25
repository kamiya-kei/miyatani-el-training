unless User.exists?(name: 'test')
  user = User.create(name: 'test', password: 'abc123', password_confirmation: 'abc123')
  Task.where(user_id: nil).update(user_id: user.id)
end

unless User.exists?(name: 'admin')
  User.create(name: 'admin', password: 'abc123', password_confirmation: 'abc123', role_id: Role::ADMIN)
end
