<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use Response;
    public function index(Request $request)
    {
        $paginate = $request->limit ? $request->limit : 10;
        $user = User::where(function ($q) use ($request) {
            if ($request->search) {
                $q->where('name', 'like', "%$request->search%")
                    ->orWhere('email', 'like', "%$request->search%");
            }
        })->paginate($paginate);

        return $this->success($user);
    }

    public function upsert(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'full_name' => 'required',
            'email' => 'required | email | unique:users,email',
            'password' => 'required',
        ]);

        if ($validate->fails()) {
            return $this->error('validation', 404, $validate->errors());
        }

        $user = User::updateOrCreate(['id' => $request->id], [
            "full_name" => $request->full_name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        return $this->success($user, "User Berhasil di tambahkan");
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return $this->success(null, "$user->full_name Berhasil di hapus");
    }

    public function userActive()
    {
        $active = User::where('status', true)->count();
        $total = User::count();

        return [
            'active' => $active,
            "total" => $total,
        ];
    }
}
