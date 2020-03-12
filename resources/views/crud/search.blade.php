@extends('layout.home');
@section('content')
<main role="main" class="flex-shrink-0">
    <div class="container">
        <h1>Create, Read, Update, Delete</h1>
        <br>
        <div class="row">
            <div class="col text-right">
                <button class="btn btn-primary" data-toggle="modal" data-target="#create">Create</button>
            </div>
        </div>
        <hr>
        <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Correo</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
            @foreach ($users as $user)
                <tr>
                    <th scope="row">{{$user->uid}}</th>    
                    <td>{{$user->name}}</td>
                    <td>{{$user->telephone}}</td>
                    <td>{{$user->email}}</td>
                    <td>
                        <a href="#" class="edit" data-toggle="modal" data-target="#update" data-uid="{{$user->uid}}">
                            <svg class="bi bi-pencil" width="26" height="26" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"></path>
                            <path fill-rule="evenodd" d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" class="delete" data-uid="{{$user->uid}}">
                            <svg class="bi bi-x-octagon-fill" width="24" height="24"  viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M13.46 2.146A.5.5 0 0013.107 2H6.893a.5.5 0 00-.353.146L2.146 6.54A.5.5 0 002 6.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V6.893a.5.5 0 00-.146-.353L13.46 2.146zm-6.106 4.5L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
          </table>
    </div>
</main>    
<!-- Modal -->
<div class="modal fade" id="create" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <form id="new_usew_form">
            @csrf
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nameInput">Name</label>
                        <input type="text" name="name" class="form-control" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="emailInput">Email address</label>
                        <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" required>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="telephoneInput">Telephone</label>
                        <input type="tel" name="telephone" class="form-control" id="telephone" maxlength="10" minlength="10" min="0" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary action_form">Save changes</button>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="modal fade" id="update" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <form id="update_usew_form">
            @csrf
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nameInput">Name</label>
                        <input type="hidden" name="uid" value="" id="uid_update">
                        <input type="text" name="name" class="form-control" id="nameInput" required>
                    </div>
                    <div class="form-group">
                        <label for="emailInput">Email address</label>
                        <input type="email" name="email" class="form-control" id="emailInput" aria-describedby="emailHelp" required>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="telephoneInput">Telephone</label>
                        <input type="tel" name="telephone" class="form-control" id="telephoneInput" maxlength="10" minlength="10" min="0" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary action_form">update changes</button>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection;